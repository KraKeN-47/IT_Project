import { createSelector } from "@reduxjs/toolkit";

import { ReduxStoreRootTypes } from "types/types";

export const selectUserTypeState = (state: ReduxStoreRootTypes) =>
  state.userData;

export const selectUserTypeLevel = () =>
  createSelector(selectUserTypeState, (state) => state.level);

export const selectUserId = () =>
  createSelector(selectUserTypeState, (state) => state.id);

export const selectUserName = () =>
  createSelector(selectUserTypeState, (state) => state.name);
