import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'TASK',
  initialState: [],
  reducers: {
    addTask(state, action) {
      state.push({ ...action.payload });
    },
    deleteTask(state, action) {
      return state.filter((item) => item.id !== action.payload)
    },
    editTask(state, action) {
      state.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.description = action.payload.description;
          todo.date = action.payload.date;
          todo.title = action.payload.title;
        }
      });
    },
    changeTaskStatus(state, action) {
      state.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.state = action.payload.state;
        }
      });
    }
  },
});

export const { addTask, deleteTask, editTask, changeTaskStatus } = taskSlice.actions;
export const { reducer: taskReducer } = taskSlice;