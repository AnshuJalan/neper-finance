// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

library FixedPoint {
    uint128 internal constant Q64 = 0x10000000000000000;
    uint internal constant Q64_MUL_100 = 100 * Q64;
}
