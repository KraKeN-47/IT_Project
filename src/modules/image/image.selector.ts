import { createSelector } from "@reduxjs/toolkit";

import { ReduxStoreRootTypes } from "types/types";

export const selectImageState = (state: ReduxStoreRootTypes) => state.image;

export const selectImagePath = () =>
  createSelector(selectImageState, (state) => state.imagePath);
