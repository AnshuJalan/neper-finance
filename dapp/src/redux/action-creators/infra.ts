import { InfraActionTypes } from "../action-types";
import { InfraActions } from "../actions";

export const switchNetwork = (network: string): InfraActions => {
  return {
    type: InfraActionTypes.SWITCH_NETWORK,
    payload: network,
  };
};
