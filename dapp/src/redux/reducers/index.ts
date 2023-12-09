import { combineReducers } from "redux";

import { infraReducer } from "./infra";
import { contractReducer } from "./contract";
import { loaderReducer } from "./loader";

export const rootReducer = combineReducers({
  infra: infraReducer,
  contract: contractReducer,
  loader: loaderReducer,
});

// Reducer's root-state
export type RootState = ReturnType<typeof rootReducer>;
