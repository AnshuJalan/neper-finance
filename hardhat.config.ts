import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.RPC_URL as string,
      accounts: [process.env.PRIVATE_KEY as string],
      chainId: 11155111,
    },
    arbitrum: {
      url: "https://sepolia-rollup.arbitrum.io/rpc",
      accounts: [process.env.PRIVATE_KEY as string],
      chainId: 421614,
    },
    polygon: {
      url: "https://rpc.public.zkevm-test.net",
      accounts: [process.env.PRIVATE_KEY as string],
      chainId: 1442,
    },
    scroll: {
      url: "https://rpc.ankr.com/scroll_sepolia_testnet",
      accounts: [process.env.PRIVATE_KEY as string],
      chainId: 534351,
    },
    base: {
      url: "https://base-goerli.publicnode.com",
      accounts: [process.env.PRIVATE_KEY as string],
      chainId: 84531,
    },
    celo: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [process.env.PRIVATE_KEY as string],
      chainId: 44787,
    },
  },
};

export default config;
