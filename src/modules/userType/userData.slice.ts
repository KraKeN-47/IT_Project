import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData } from "types/types";

const initialState: IUserData = {
  name: "",
  level: 0,
  id: -1,
};

const userData = createSlice({
  name: "userType",
  initialState,
  reducers: {
    setUserType: (state, { payload }: PayloadAction<IUserData>) => ({
      ...state,
      level: payload.level,
      name: payload.name,
      id: payload.id,
    }),
  },
});

export const { setUserType } = userData.actions;

export default userData.reducer;
