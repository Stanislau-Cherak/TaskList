import { createSlice } from "@reduxjs/toolkit";

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
    setMessage(state, action) {
      state.severity = action.payload.severity;
      state.message = action.payload.message;
      state.show = action.payload.show;
    },
    showMessage(state, action) {
      state.show = action.payload.show;
    }
  }
});

export const { setMessage, showMessage } = messageSlice.actions;
export const { reducer: messageReducer } = messageSlice;
