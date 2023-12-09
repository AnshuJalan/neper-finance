// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./FixedPoint.sol";

library Constants {
    uint internal constant BORROW_FEE_BPS = 500;

    uint internal constant BASE_MCR = 105 * FixedPoint.Q64;

    uint internal constant MAX_REDEMPTION_D_RATIO_BUMP = 500 * FixedPoint.Q64;

    uint internal constant CONTINUOUS_D_RATIO_DECAY = 10;

    uint internal constant SECONDS_IN_A_YEAR = 86400 * 365;
    uint internal constant SECONDS_IN_A_DAY = 86400;
}
