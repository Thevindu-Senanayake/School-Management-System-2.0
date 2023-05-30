import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserStatus } from "../types/reducerTypes";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: true,
    error: "",
    users: [] as User[],
    success: false,
  },
  reducers: {
    request: (state) => {
      state.loading = true;
      state.error = "";
      state.success = false;
      state.users = [] as User[];
    },
    success: (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.success = true;
      state.users = action.payload;
    },
    updateUserSuccess: (state, action: PayloadAction<boolean>) => {
      state.loading = false;
      state.success = action.payload;
    },
    updateStatus: (state, action: PayloadAction<UserStatus>) => {
      state.users.filter(
        (user) => user._id === Object.keys(action.payload)[0]
      )[0].active = action.payload[Object.keys(action.payload)[0]];
    },
    failure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
});

export const {
  request,
  success,
  updateUserSuccess,
  updateStatus,
  clearError,
  failure,
} = userSlice.actions;

export default userSlice.reducer;
