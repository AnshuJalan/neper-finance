import { Reducer } from "redux";

// Actions and types
import { InfraActions } from "../actions";
import { InfraActionTypes } from "../action-types";
import { DEFAULT_NETWORK } from "../../utils/constants";

interface InfraState {
  network: string;
}

const initialState: InfraState = {
  network: localStorage.getItem("network") || DEFAULT_NETWORK,
};

export const infraReducer: Reducer<InfraState, InfraActions> = (
  state = initialState,
  action
): InfraState => {
  switch (action.type) {
    case InfraActionTypes.SWITCH_NETWORK: {
      return {
        network: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
