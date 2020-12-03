import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Image } from "types/types";

const initialState: Image = {
  imagePath: "",
};

const image = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImagePath: (state, { payload }: PayloadAction<Image>) => ({
      ...state,
      imagePath: payload.imagePath,
    }),
  },
});

export const { setImagePath } = image.actions;

export default image.reducer;
