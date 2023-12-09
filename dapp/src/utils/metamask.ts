import { CHAINS } from "./constants";

export const switchNetworkMM = async (expected: string) => {
  if (!CHAINS[expected]) return;

  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: expected }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: expected,
                rpcUrls: [CHAINS[expected].rpcUrl],
                chainName: CHAINS[expected].name,
                nativeCurrency: CHAINS[expected].currency,
              },
            ],
          });
        } catch (addError) {
          throw addError;
        }
      } else {
        throw switchError;
      }
    }
  }
};
