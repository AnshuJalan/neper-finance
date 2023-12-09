import { Reducer } from "redux";

// Actions and types
import { Vault, Params } from "../../utils/types";
import { ContractActions } from "../actions";
import { ContractActionTypes } from "../action-types";

interface ContractState {
  params: Params;
  vaults: Vault[];
}

const initialState: ContractState = {
  params: {
    mcr: "0",
    dMCR: "0",
    debt: "0",
    coll: "0",
  },
  vaults: [],
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
    default: {
      return state;
    }
  }
};
