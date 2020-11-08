import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userDataReducer from "modules/userType/userData.slice";
import { ReduxStoreRootTypes } from "types/types";

const combinedReducers = combineReducers<ReduxStoreRootTypes>({
  userData: userDataReducer,
});

export const store = configureStore({
  reducer: combinedReducers,
});
