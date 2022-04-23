import { configureStore } from '@reduxjs/toolkit';

import { taskReducer } from '../features/slices/TaskSlice';
import { todoReducer } from '../features/slices/TodoSlice';
import { messageReducer } from '../features/slices/MessageSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    todos: todoReducer,
    message: messageReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
