import { ContractActionTypes } from "../action-types";

import { Vault, Params } from "../../utils/types";

export interface FetchDataAction {
  type: ContractActionTypes.FETCH_DATA;
  payload: {
    params: Params;
    vaults: Vault[];
  };
}

export type ContractActions = FetchDataAction;
