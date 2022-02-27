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
    completeTask(state, action) {
      state.forEach((task) => {
        if (task.id === action.payload.id) {
          task.status = 'done';
          task.todoList.forEach(todo => todo.status = 'done');
        }
      });
    },
    deleteTodo(state, action) {
      const currentTask = state.find(task => task.id === action.payload.parentTaskID);
      const currentTodos = currentTask.todoList.filter((todo) => {
        return todo.id !== action.payload.id;
      })
      if (currentTodos.length !== 0) {
        currentTask.todoList = currentTodos;
        return;
      }
      currentTask.todoList = [];
    },
    completeTodo(state, action) {
      const currentTask = state.find(task => task.id === action.payload.parentTaskID);
      currentTask.todoList.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.status = 'done';
        }
      });
    },
  },
});

export const { addTask, deleteTask, completeTask, deleteTodo, completeTodo } = taskSlice.actions;
export const { reducer: taskReducer } = taskSlice;