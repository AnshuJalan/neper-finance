import { Reducer } from "redux";

// Actions and types
import { Vault, Params } from "../../utils/types";
import { ContractActions } from "../actions";
import { ContractActionTypes } from "../action-types";

interface ContractState {
  params: Params;
  vaults: Vault[];
  isLoading: boolean;
}

const initialState: ContractState = {
  params: {
    mcr: "0",
    dMCR: "0",
    debt: "0",
    coll: "0",
  },
  vaults: [],
  isLoading: false,
};

export const contractReducer: Reducer<ContractState, ContractActions> = (
  state = initialState,
  action
): ContractState => {
  switch (action.type) {
    case ContractActionTypes.FETCH_DATA: {
      return {
        ...action.payload,
      };
    }
    case ContractActionTypes.SET_DATA_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    default: {
      return state;
    }
  }
};
