// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IVaultManager {
    // --- Events ---
    event CreateVault(address indexed owner, uint vaultId, uint128 coll, uint128 dri, uint128 cri);
    event IncreaseVaultColl(address indexed owner, uint vaultId, uint128 coll, uint128 dri, uint128 cri);
    event DecreaseVaultColl(address indexed owner, uint vaultId, uint128 coll, uint128 dri, uint128 cri);
    event IncreaseVaultDebt(address indexed owner, uint vaultId, uint128 debt, uint128 dri, uint128 cri);
    event DecreaseVaultDebt(address indexed owner, uint vaultId, uint128 debt, uint128 dri, uint128 cri);
    event Liquidate(address indexed liquidator, address indexed owner, uint vaultId);
    event Redeem(address indexed redeemer, uint debt, uint coll);

    function createVault(uint128 initialColl) external payable;

    function increaseVaultColl(uint vaultId, uint128 collIncrease) external payable;

    function decreaseVaultColl(uint vaultId, uint128 collDecrease) external;

    function increaseVaultDebt(uint vaultId, uint128 debtIncrease) external;

    function decreaseVaultDebt(uint vaultId, uint128 debtDecrease) external;

    function liquidate(address owner, uint vaultId) external;

    function redeem(uint debtToRedeem) external;
}
