// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

library Errors {
    string constant NOT_AUTHORISED = "0";
    string constant INVALID_ETH_AMOUNT = "1";
    string constant UNDER_COLLATERALISED_VAULT = "2";
    string constant DEADLINE_CROSSED = "3";
    string constant INVALID_SIGNATURE = "4";
    string constant FAILED_ETH_TRANSFER = "5";
    string constant VAULT_IS_INACTIVE = "6";
    string constant VAULT_IS_NOT_UNDERCOLLATERALISED = "7";
    string constant VAULT_IS_ACTIVE = "8";
}
