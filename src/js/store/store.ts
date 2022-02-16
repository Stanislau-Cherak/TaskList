import { configureStore } from '@reduxjs/toolkit';

import { taskReducer } from '../features/slices/TaskSlice';
import { messageReducer } from '../features/slices/MessageSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    message: messageReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
