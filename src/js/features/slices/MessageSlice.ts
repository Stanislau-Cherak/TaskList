import { createSlice } from "@reduxjs/toolkit";

import { AlertColor } from "@mui/material/Alert"

type MessageType = {
  show: boolean;
  message: string;
  duration: number;
  severity: AlertColor;
}

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
