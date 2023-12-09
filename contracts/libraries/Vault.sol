// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./FixedPoint.sol";

library Vault {
    struct State {
        uint128 debt;
        uint128 collateral;
        uint128 lastDebtRebaseIndex;
        uint128 lastCollRebaseIndex;
        bool isActive;
    }

    function computeKey(address addr, uint id) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(addr, id));
    }

    function get(
        mapping(bytes32 => State) storage self,
        address owner,
        uint vaultId
    ) internal view returns (State storage vault) {
        return self[computeKey(owner, vaultId)];
    }

    function insert(mapping(bytes32 => State) storage self, address owner, uint vaultId, State memory vault) internal {
        self[computeKey(owner, vaultId)] = vault;
    }

    function update(mapping(bytes32 => State) storage self, address owner, uint vaultId, State memory vault) internal {
        self[computeKey(owner, vaultId)] = vault;
    }
}
