import { WalletActions } from "../action-types";

export interface ConnectWalletAction {
  type: WalletActions.CONNECT_WALLET;
  payload: {
    account: string;
    chain: string;
  };
}
