import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'TASK',
  initialState: [],
  reducers: {
    addTask(state, action) {
      state.push({ ...action.payload });
    },
    deleteTask(state, action) {
      return state.filter((task) => task.id !== action.payload.id);
    },
    editTask(state, action) {
      state.forEach((task) => {
        if (task.id === action.payload.id) {
          task.description = action.payload.description;
          task.title = action.payload.title;
        }
      });
    },
    completeTask(state, action) {
      state.forEach((task) => {
        if (task.id === action.payload.id) {
          task.status = 'done';
          task.todoList.forEach(todo=>todo.status='done');          
        }
      });
    }
  },
});

export const { addTask, deleteTask, editTask, completeTask } = taskSlice.actions;
export const { reducer: taskReducer } = taskSlice;