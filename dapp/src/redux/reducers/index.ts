import { combineReducers } from "redux";

import { infraReducer } from "./infra";
import { contractReducer } from "./contract";

export const rootReducer = combineReducers({
  infra: infraReducer,
  contract: contractReducer,
});

// Reducer's root-state
export type RootState = ReturnType<typeof rootReducer>;
