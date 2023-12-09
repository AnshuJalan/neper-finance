// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./dependencies/Ownable.sol";
import "./interfaces/IPriceFeed.sol";
import "./interfaces/chainlink/IAggregatorV3Interface.sol";

contract PriceFeed is Ownable, IPriceFeed {
    struct Slot0 {
        uint128 price;
        uint128 updatedAt;
    }

    uint constant SCALE = 8;

    Slot0 internal slot0;
    IAggregatorV3Interface internal chainlinkFeed;

    function setAddresses(address oracleAddress) external onlyOwner {
        chainlinkFeed = IAggregatorV3Interface(oracleAddress);
    }

    function updatePrice() external {
        (, int answer, , uint timeStamp, ) = chainlinkFeed.latestRoundData();
        slot0 = Slot0(uint128(uint(answer)), uint128(timeStamp));
    }

    function setPriceForced(uint128 price) external onlyOwner {
        slot0 = Slot0(price, uint128(block.timestamp));
    }

    function getPrice() external view returns (uint128) {
        Slot0 memory _slot0 = slot0;
        return _slot0.price;
    }

    function getScale() external pure returns (uint) {
        return SCALE;
    }
}
