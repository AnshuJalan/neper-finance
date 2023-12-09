import { ethers } from "ethers";

import { CHAINS } from "./constants";
import NeperUSDABI from "../abi/NeperUSD";
import VaultManagerABI from "../abi/VaultManager";

let vaultManager: ethers.Contract;
let neperUSD: ethers.Contract;

export const setContracts = (network: string) => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    vaultManager = new ethers.Contract(
      CHAINS[network].contracts.vaultManager,
      JSON.stringify(VaultManagerABI),
      provider
    );
    neperUSD = new ethers.Contract(
      CHAINS[network].contracts.neperUSD,
      JSON.stringify(NeperUSDABI),
      provider
    );
  }
};

export const fetchParamsRaw = async () => {
  try {
    const rebaseIndices = await vaultManager.rebaseIndices();
    const minimumCollRatio = await vaultManager.minimumCollRatio();
    const collLocked = await vaultManager.collLocked();
    const debt = await neperUSD.totalSupply();

    return { rebaseIndices, minimumCollRatio, collLocked, debt };
  } catch (err: any) {
    throw err;
  }
};
