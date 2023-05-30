import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AttendanceType } from "../types/reducerTypes";

const attendanceInitialState = {
  loading: true,
  success: false,
  error: "",
  attendance: [] as Array<AttendanceType>,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: attendanceInitialState,
  reducers: {
    request: (state) => {
      state.loading = true;
      state.success = false;
      state.error = "";
      state.attendance = [] as Array<AttendanceType>;
    },
    success: (state, action: PayloadAction<Array<AttendanceType>>) => {
      state.attendance = action.payload;
      state.loading = false;
      state.success = true;
    },
    markAttendanceSuccess: (state, action: PayloadAction<boolean>) => {
      state.loading = false;
      state.success = action.payload;
    },
    failure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
});

export const { request, success, failure, markAttendanceSuccess, clearError } =
  attendanceSlice.actions;

export default attendanceSlice.reducer;
