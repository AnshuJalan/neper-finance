// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IPriceFeed {
    // -- Events --
    event UpdatePrice(uint128 updatedAt, uint128 price);

    // -- Functions --
    function updatePrice() external;

    function getPrice() external view returns (uint128);

    function getScale() external view returns (uint);
}
