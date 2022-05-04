import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MessageType } from "../../types/types";

const initialState: MessageType = {
  show: false,
  severity: 'success',
  duration: 3000,
  message: ''
}

const messageSlice = createSlice({
  name: 'MESSAGE',
  initialState: initialState,
  reducers: {
    setMessage(state, action: PayloadAction<MessageType>) {
      state.severity = action.payload.severity;
      state.message = action.payload.message;
      state.show = action.payload.show;
    },
    showMessage(state, action: PayloadAction<boolean>) {
      state.show = action.payload;
    }
  }
});

export const { setMessage, showMessage } = messageSlice.actions;
export const { reducer: messageReducer } = messageSlice;
