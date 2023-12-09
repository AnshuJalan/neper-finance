import { ContractActionTypes } from "../action-types";

import { Vault, Params } from "../../utils/types";

export interface FetchDataAction {
  type: ContractActionTypes.FETCH_DATA;
  payload: {
    params: Params;
    vaults: Vault[];
    isLoading: boolean;
  };
}

export interface SetDataLoadingAction {
  type: ContractActionTypes.SET_DATA_LOADING;
}

export type ContractActions = FetchDataAction | SetDataLoadingAction;
