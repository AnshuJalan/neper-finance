import { LoaderActionTypes } from "../action-types";

export interface SetLoaderAction {
  type: LoaderActionTypes.SET_LOADER;
  payload: boolean;
}

export type LoaderActions = SetLoaderAction;
