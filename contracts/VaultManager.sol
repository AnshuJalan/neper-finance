// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./NeperUSD.sol";
import "./libraries/Vault.sol";
import "./libraries/Errors.sol";
import "./libraries/Constants.sol";
import "./libraries/FixedPoint.sol";
import "./interfaces/IPriceFeed.sol";
import "./interfaces/IVaultManager.sol";

contract VaultManager is IVaultManager {
    using Vault for mapping(bytes32 => Vault.State);
    using Vault for Vault.State;

    struct RebaseIndices {
        uint128 debtRebaseIndex;
        uint128 collRebaseIndex;
        uint lastUpdate;
    }

    struct MinimumCollRatio {
        uint96 ratio;
        uint96 dRatio;
        uint64 lastUpdate;
    }

    RebaseIndices public rebaseIndices;
    MinimumCollRatio public minimumCollRatio;

    uint public lastVaultId;
    uint public collLocked;

    IPriceFeed internal pricefeed;
    NeperUSD internal neperUSD;

    mapping(bytes32 => Vault.State) public vaults;

    constructor() {
        rebaseIndices = RebaseIndices(
            FixedPoint.Q64,
            FixedPoint.Q64,
            block.timestamp
        );
        minimumCollRatio = MinimumCollRatio(
            uint96(Constants.BASE_MCR),
            0,
            uint64(block.timestamp)
        );
    }

    function initialize(address _pricefeed) external {
        require(address(neperUSD) == address(0), Errors.NOT_AUTHORISED);
        pricefeed = IPriceFeed(_pricefeed);
        neperUSD = new NeperUSD();
    }

    function _computeFeeDeductedDebtIndex(
        uint128 debtRebaseIndex,
        uint lastUpdate
    ) private view returns (uint128) {
        uint denom = Constants.SECONDS_IN_A_YEAR * 10000;
        uint timePassed = block.timestamp - lastUpdate;
        return
            uint128(
                (debtRebaseIndex *
                    (denom - timePassed * Constants.BORROW_FEE_BPS)) / denom
            );
    }

    function _updateRebaseIndices() private returns (RebaseIndices memory) {
        RebaseIndices memory _rebaseIndices = rebaseIndices;

        _rebaseIndices.debtRebaseIndex = _computeFeeDeductedDebtIndex(
            _rebaseIndices.debtRebaseIndex,
            _rebaseIndices.lastUpdate
        );
        _rebaseIndices.lastUpdate = block.timestamp;

        rebaseIndices = _rebaseIndices;
        return _rebaseIndices;
    }

    function _isUnderCollateralised(
        Vault.State memory vault,
        uint mcr,
        uint price,
        uint scale
    ) private pure returns (bool) {
        uint lhs = vault.collateral * price * FixedPoint.Q64_MUL_100;
        uint rhs = mcr * vault.debt * scale;
        return lhs < rhs;
    }

    function _touchMCR() private returns (uint) {
        MinimumCollRatio memory _minimumCollRatio = minimumCollRatio;

        uint timePassed = block.timestamp - minimumCollRatio.lastUpdate;
        uint _denom = Constants.SECONDS_IN_A_DAY * 10000;
        uint denom = _denom * FixedPoint.Q64;

        uint updatedRatio = (_minimumCollRatio.ratio *
            (denom + timePassed * _minimumCollRatio.dRatio)) / denom;
        uint updatedDRatio = (_minimumCollRatio.dRatio *
            (_denom - timePassed * Constants.CONTINUOUS_D_RATIO_DECAY)) /
            _denom;

        minimumCollRatio = MinimumCollRatio(
            uint96(updatedRatio),
            uint96(updatedDRatio),
            uint64(block.timestamp)
        );
        return updatedRatio;
    }

    function _touchVault(
        Vault.State memory vault
    ) private returns (Vault.State memory) {
        require(vault.isActive, Errors.VAULT_IS_INACTIVE);

        RebaseIndices memory _rebaseIndices = _updateRebaseIndices();

        unchecked {
            vault.debt =
                (vault.debt * vault.lastDebtRebaseIndex) /
                _rebaseIndices.debtRebaseIndex;
            vault.collateral =
                (vault.collateral * vault.lastCollRebaseIndex) /
                _rebaseIndices.collRebaseIndex;

            vault.lastCollRebaseIndex = _rebaseIndices.collRebaseIndex;
            vault.lastDebtRebaseIndex = _rebaseIndices.debtRebaseIndex;
        }

        return vault;
    }

    function createVault(uint128 initialColl) external payable {
        require(msg.value == initialColl, Errors.INVALID_ETH_AMOUNT);

        RebaseIndices memory _rebaseIndices = _updateRebaseIndices();

        Vault.State memory _vault = Vault.State({
            isActive: true,
            debt: 0,
            collateral: initialColl,
            lastDebtRebaseIndex: _rebaseIndices.debtRebaseIndex,
            lastCollRebaseIndex: _rebaseIndices.collRebaseIndex
        });

        uint _vaultId = lastVaultId + 1;
        vaults.insert(msg.sender, _vaultId, _vault);

        lastVaultId = _vaultId;
        collLocked += msg.value;

        emit CreateVault(
            msg.sender,
            _vaultId,
            initialColl,
            _rebaseIndices.debtRebaseIndex,
            _rebaseIndices.collRebaseIndex
        );
    }

    function increaseVaultColl(
        uint vaultId,
        uint128 collIncrease
    ) external payable {
        require(msg.value == collIncrease, Errors.INVALID_ETH_AMOUNT);

        Vault.State memory vault = _touchVault(vaults.get(msg.sender, vaultId));
        vault.collateral += collIncrease;

        collLocked += collIncrease;
        vaults.update(msg.sender, vaultId, vault);

        emit IncreaseVaultColl(
            msg.sender,
            vaultId,
            collIncrease,
            vault.lastDebtRebaseIndex,
            vault.lastCollRebaseIndex
        );
    }

    function decreaseVaultColl(uint vaultId, uint128 collDecrease) external {
        uint updatedMCR = _touchMCR();
        Vault.State memory vault = _touchVault(vaults.get(msg.sender, vaultId));
        vault.collateral -= collDecrease;

        require(
            !_isUnderCollateralised(
                vault,
                updatedMCR,
                pricefeed.getPrice(),
                pricefeed.getScale()
            )
        );

        collLocked -= collDecrease;
        vaults.update(msg.sender, vaultId, vault);

        emit DecreaseVaultColl(
            msg.sender,
            vaultId,
            collDecrease,
            vault.lastDebtRebaseIndex,
            vault.lastCollRebaseIndex
        );

        (bool sent, ) = (msg.sender).call{value: collDecrease}("");
        require(sent, Errors.FAILED_ETH_TRANSFER);
    }

    function increaseVaultDebt(uint vaultId, uint128 debtIncrease) external {
        uint updatedMCR = _touchMCR();
        Vault.State memory vault = _touchVault(vaults.get(msg.sender, vaultId));
        vault.debt += debtIncrease;

        require(
            !_isUnderCollateralised(
                vault,
                updatedMCR,
                pricefeed.getPrice(),
                pricefeed.getScale()
            )
        );
        vaults.update(msg.sender, vaultId, vault);

        emit IncreaseVaultDebt(
            msg.sender,
            vaultId,
            debtIncrease,
            vault.lastDebtRebaseIndex,
            vault.lastCollRebaseIndex
        );

        neperUSD.mint(msg.sender, debtIncrease);
    }

    function decreaseVaultDebt(uint vaultId, uint128 debtDecrease) external {
        Vault.State memory vault = _touchVault(vaults.get(msg.sender, vaultId));

        vault.debt -= debtDecrease;
        vaults.update(msg.sender, vaultId, vault);

        emit DecreaseVaultDebt(
            msg.sender,
            vaultId,
            debtDecrease,
            vault.lastDebtRebaseIndex,
            vault.lastCollRebaseIndex
        );

        neperUSD.burn(msg.sender, debtDecrease);
    }

    function liquidate(address owner, uint vaultId) external {
        uint updatedMCR = _touchMCR();
        Vault.State memory vault = _touchVault(vaults.get(owner, vaultId));

        require(
            _isUnderCollateralised(
                vault,
                updatedMCR,
                pricefeed.getPrice(),
                pricefeed.getScale()
            ),
            Errors.VAULT_IS_NOT_UNDERCOLLATERALISED
        );
        vault.isActive = false;

        collLocked -= vault.collateral;
        vaults.update(owner, vaultId, vault);

        emit Liquidate(msg.sender, owner, vaultId);

        neperUSD.burn(msg.sender, vault.debt);

        (bool sent, ) = (msg.sender).call{value: vault.collateral}("");
        require(sent, Errors.FAILED_ETH_TRANSFER);
    }

    function redeem(uint debtToRedeem) external {
        (uint price, uint scale) = (pricefeed.getPrice(), pricefeed.getScale());
        uint collAmount = (debtToRedeem * scale) / price;

        RebaseIndices memory _rebaseIndices = rebaseIndices;
        _rebaseIndices.debtRebaseIndex = _computeFeeDeductedDebtIndex(
            _rebaseIndices.debtRebaseIndex,
            _rebaseIndices.lastUpdate
        );

        uint debtSupply = neperUSD.totalSupply();
        uint _collLocked = collLocked;

        uint updatedDebt = debtSupply - debtToRedeem;
        uint updatedColl = _collLocked - collAmount;

        _rebaseIndices.debtRebaseIndex = uint128(
            (debtSupply * _rebaseIndices.debtRebaseIndex) / updatedDebt
        );
        _rebaseIndices.collRebaseIndex = uint128(
            (collLocked * _rebaseIndices.collRebaseIndex) / updatedColl
        );

        uint denom = debtSupply * 10000;
        uint _leftOp = denom * minimumCollRatio.dRatio;
        uint _rightOP = Constants.MAX_REDEMPTION_D_RATIO_BUMP * debtToRedeem;

        minimumCollRatio.dRatio += uint96((_leftOp + _rightOP) / denom);
        rebaseIndices = _rebaseIndices;

        emit Redeem(msg.sender, debtToRedeem, collAmount);

        neperUSD.burn(msg.sender, debtToRedeem);

        (bool sent, ) = (msg.sender).call{value: collAmount}("");
        require(sent, Errors.FAILED_ETH_TRANSFER);
    }
}
