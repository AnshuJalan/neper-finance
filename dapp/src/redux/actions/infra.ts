import { InfraActionTypes } from "../action-types";

export interface SwitchNetworkAction {
  type: InfraActionTypes.SWITCH_NETWORK;
  payload: string;
}

export type InfraActions = SwitchNetworkAction;
