import { createSelector } from "@reduxjs/toolkit";

import { ReduxStoreRootTypes } from "types/types";

export const selectUserTypeState = (state: ReduxStoreRootTypes) =>
  state.userData;

export const selectUserTypeLevel = () => {
  createSelector(selectUserTypeState, (state) => state.level);
};
