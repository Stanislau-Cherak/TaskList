import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'TASK',
  initialState: [],
  reducers: {
    addTask(state, action) {
      state.push({ ...action.payload });
    },
    deleteTask(state, action) {
      return state.filter((task) => task.id !== action.payload)
    },
    editTask(state, action) {
      state.forEach((task) => {
        if (task.id === action.payload.id) {
          task.description = action.payload.description;
          task.title = action.payload.title;
        }
      });
    },
    changeTaskStatus(state, action) {
      state.forEach((task) => {
        if (task.id === action.payload.id) {
          task.status = action.payload.status;
          task.todoList.forEach(todo=>todo.status=action.payload.status);          
        }
      });
    }
  },
});

export const { addTask, deleteTask, editTask, changeTaskStatus } = taskSlice.actions;
export const { reducer: taskReducer } = taskSlice;