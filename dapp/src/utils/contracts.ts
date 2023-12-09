import { ethers } from "ethers";

import { CHAINS } from "./constants";
import NeperUSDABI from "../abi/NeperUSD";
import VaultManagerABI from "../abi/VaultManager";
import BigNumber from "bignumber.js";

let vaultManager: ethers.Contract;
let neperUSD: ethers.Contract;

export const setContracts = async (network: string) => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    vaultManager = new ethers.Contract(
      CHAINS[network].contracts.vaultManager,
      JSON.stringify(VaultManagerABI),
      signer
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
    if (!vaultManager) return undefined; // unholy, I know
    const rebaseIndices = await vaultManager.rebaseIndices();
    const minimumCollRatio = await vaultManager.minimumCollRatio();
    const collLocked = await vaultManager.collLocked();
    const debt = await neperUSD.totalSupply();

    return { rebaseIndices, minimumCollRatio, collLocked, debt };
  } catch (err: any) {
    throw err;
  }
};

export const fetchVaultsRaw = async (account: string): Promise<any> => {
  try {
    const vaults: any = [];
    for (let id = 1; id <= 5; id++) {
      const hash = ethers.solidityPackedKeccak256(["address", "uint256"], [account, id]);
      const vault = await vaultManager.vaults(hash);
      if (vault["4"] !== false) {
        vaults.push({
          id: `${account}-{id}`,
          coll: new BigNumber(vault["1"]).dividedBy(10 ** 18),
          debt: new BigNumber(vault["0"]).dividedBy(10 ** 18),
          lastDebtRebaseIndex: vault["2"],
          lastCollRebaseIndex: vault["3"],
        });
      }
    }
    return vaults;
  } catch (err: any) {
    throw err;
  }
};

export const createVault = async (collAmount: string) => {
  try {
    const tx = await vaultManager.createVault(ethers.parseEther(collAmount), {
      value: ethers.parseEther(collAmount),
    });
    await tx.wait();
  } catch (err: any) {
    throw err;
  }
};

export const addCollateral = async (vaultId: number, collAmount: string) => {
  try {
    const tx = await vaultManager.increaseVaultColl(vaultId, ethers.parseEther(collAmount), {
      value: ethers.parseEther(collAmount),
    });
    await tx.wait();
  } catch (err: any) {
    throw err;
  }
};

export const withdrawCollateral = async (vaultId: number, collAmount: string) => {
  try {
    const tx = await vaultManager.decreaseVaultColl(vaultId, ethers.parseEther(collAmount));
    await tx.wait();
  } catch (err: any) {
    throw err;
  }
};

export const mintDebt = async (vaultId: number, debtAmount: string) => {
  try {
    const tx = await vaultManager.increaseVaultDebt(vaultId, ethers.parseUnits(debtAmount, 18));
    await tx.wait();
  } catch (err: any) {
    throw err;
  }
};

export const returnDebt = async (vaultId: number, debtAmount: string) => {
  try {
    const tx = await vaultManager.decreaseVaultDebt(vaultId, ethers.parseUnits(debtAmount, 18));
    await tx.wait();
  } catch (err: any) {
    throw err;
  }
};
