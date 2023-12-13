# Neper Finance

🏆 **Winning submission in Mantle and Polygon Defi Tracks at [ETHGlobal ETHIndia](https://ethindia.co/)**

🌐 **Original Devfolio submission:** https://devfolio.co/projects/neper-finance-f746

## Problem solved by Neper

Existing stablecoin protocols often have a very low maximum Loan-to-Value (LTV) ratio, which significantly limits leverage capacity. These protocols are typically dependent on governance or use inefficient algorithms for stability maintenance. Neper addresses these issues with our innovative algorithm that issues pUSD collateralized by ETH.

1. 💸 **Low Minimum Collateral Requirement or High LTV**: Inspired by Liquity, we have developed a novel redemption system that maintains a hard price floor of $1. Unlike Liquity, this system does not significantly increase the effective Minimum Collateral Requirement (MCR).
    - Rather than redeeming from the least collateralized vaults, we pool collateral from all vaults and redeem it pro-rated from each vault.
    - This process is efficient, even with a million active vaults, and is complemented by a small, controlled increase in MCR to further disincentivize minting.

2. 📉 **Negative Interest Rates**: During bear markets, when borrowing demand is low and the protocol maintains a hard price floor, the value of the stablecoin can easily exceed $1 and remain there. To actively address this, we introduce the novel concept of an effective negative interest rate to stimulate borrowing demand. How does it work?
    - Each time a redemption occurs, the MCR gradually increases by a small percentage. This strengthens the $1 floor but also makes it easy to stay above $1 in sticky markets.
    - To counter this, our algorithm continuously reduces the MCR, with a cap at 105%. This approach provides more flexibility to those who minted in the 120+% range, effectively acting as a negative interest rate and re-pegging the price by increasing supply.

3. **➕ Misc Features**:  A small aspect, but the protocol is designed with leverage traders in mind, allowing for the creation of multiple vaults enabling users to manage multiple strategies.

**TLDR;** 💵 Neper offers USD borrowing at a really high LTV / low MCR without losing stability.

## Deployed Contracts

| Network               | Vault Manager                                                                                                                                  | Stablecoin                                                                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Sepolia               | [0xCD010F537A4054e4D9DC413A3b81C0fbD8782b41](https://sepolia.etherscan.io/address/0xCD010F537A4054e4D9DC413A3b81C0fbD8782b41)                  | [0xabe877b0d850a13918cf5b2bcaa9bbea6c35c74f](https://sepolia.etherscan.io/address/0xabe877b0d850a13918cf5b2bcaa9bbea6c35c74f)                  |
| Arbitrum Sepolia      | [0x49F57d2Da69d714D2c4E9B4B6e8A73D998Ca1Dfa](https://testnet.arbiscan.io/address/0x49F57d2Da69d714D2c4E9B4B6e8A73D998Ca1Dfa)                   | [0xd9698c981544e09a4e9becfd2d75abb2e91823e6](https://testnet.arbiscan.io/address/0xd9698c981544e09a4e9becfd2d75abb2e91823e6)                   |
| Polygon zkEVM Testnet | [0x9666242Cc04Be9BFbc6165640Ce23208aEb4398a](https://testnet-zkevm.polygonscan.com/address/0x9666242Cc04Be9BFbc6165640Ce23208aEb4398a)         | [0xd449bb18c6020296ff0f790c4758bbbd5fec675b](https://testnet-zkevm.polygonscan.com/address/0xd449bb18c6020296ff0f790c4758bbbd5fec675b)         |
| Scroll zkEVM Sepolia  | [0x7F0A3832BadC8568084fe5Ab600b81638F28F15f](https://sepolia.scrollscan.dev/address/0x7F0A3832BadC8568084fe5Ab600b81638F28F15f)                | [0x92b63d8d8fb8dd7a613e3c9f9651456dfeaeb546](https://sepolia.scrollscan.dev/address/0x92b63d8d8fb8dd7a613e3c9f9651456dfeaeb546)                |
| Base Goerli           | [0x9666242Cc04Be9BFbc6165640Ce23208aEb4398a](https://goerli.basescan.org/address/0x9666242Cc04Be9BFbc6165640Ce23208aEb4398a)                   | [0xd449bb18c6020296ff0f790c4758bbbd5fec675b](https://goerli.basescan.org/address/0xd449bb18c6020296ff0f790c4758bbbd5fec675b)                   |
| Celo Alfajores        | [0x9666242Cc04Be9BFbc6165640Ce23208aEb4398a](https://alfajores-blockscout.celo-testnet.org/address/0x9666242Cc04Be9BFbc6165640Ce23208aEb4398a) | [0xd449bb18c6020296ff0f790c4758bbbd5fec675b](https://alfajores-blockscout.celo-testnet.org/address/0xd449bb18c6020296ff0f790c4758bbbd5fec675b) |
| Mantle Testnet        | [0x9666242Cc04Be9BFbc6165640Ce23208aEb4398a](https://explorer.testnet.mantle.xyz/address/0x9666242Cc04Be9BFbc6165640Ce23208aEb4398a)           | [0xd449bb18c6020296ff0f790c4758bbbd5fec675b](https://explorer.testnet.mantle.xyz/address/0xd449bb18c6020296ff0f790c4758bbbd5fec675b)           |
| X1 Testnet            | [0x9666242Cc04Be9BFbc6165640Ce23208aEb4398a](https://www.oklink.com/x1-test/address/0x9666242Cc04Be9BFbc6165640Ce23208aEb4398a)                | [0xd449bb18c6020296ff0f790c4758bbbd5fec675b](https://www.oklink.com/x1-test/address/0xd449bb18c6020296ff0f790c4758bbbd5fec675b)                |
