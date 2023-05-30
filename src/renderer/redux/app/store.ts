import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/auth";
import attendanceReducer from "../features/attendance";
import userReducer from "../features/user";
import messageReducer from "../features/message";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    attendance: attendanceReducer,
    user: userReducer,
    message: messageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
