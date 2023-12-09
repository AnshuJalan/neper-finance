import { Reducer } from "redux";

// Actions and types
import { LoaderActions } from "../actions";
import { LoaderActionTypes } from "../action-types";

interface LoaderState {
  isLoading: boolean;
}

const initialState: LoaderState = {
  isLoading: false,
};

export const loaderReducer: Reducer<LoaderState, LoaderActions> = (
  state = initialState,
  action
): LoaderState => {
  switch (action.type) {
    case LoaderActionTypes.SET_LOADER: {
      return {
        isLoading: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
