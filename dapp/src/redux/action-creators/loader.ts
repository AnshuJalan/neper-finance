import { LoaderActionTypes } from "../action-types";
import { LoaderActions } from "../actions";

export const setLoader = (state: boolean): LoaderActions => {
  return {
    type: LoaderActionTypes.SET_LOADER,
    payload: state,
  };
};
