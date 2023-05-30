import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../types/reducerTypes";

const messageSlice = createSlice({
  name: "chat",
  initialState: {
    loading: true,
    success: false,
    isSend: false,
    error: "",
    messages: [] as Message[],
  },
  reducers: {
    request: (state) => {
      state.loading = true;
      state.success = false;
      state.isSend = false;
      state.error = "";
      state.messages = [] as Message[];
    },
    getMessagesSccess: (state, action: PayloadAction<Array<Message>>) => {
      state.loading = false;
      state.success = true;
      state.messages = action.payload;
    },
    sendMessageSuccess: (state, action: PayloadAction<boolean>) => {
      state.loading = false;
      state.isSend = action.payload;
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

export const {
  request,
  getMessagesSccess,
  sendMessageSuccess,
  failure,
  clearError,
} = messageSlice.actions;

export default messageSlice.reducer;
