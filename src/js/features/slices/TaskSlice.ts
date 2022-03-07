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
    addTodo(state, action) {
      const currentTask = state.find(task => task.id === action.payload.parentTaskID);
      currentTask.todoList.push({ ...action.payload });
      currentTask.status = 'active';
    },
    deleteTodo(state, action) {
      const currentTask = state.find(task => task.id === action.payload.parentTaskID);
      const currentTodos = currentTask.todoList.filter((todo) => {
        return todo.id !== action.payload.id;
      })
      if (currentTodos.length !== 0) {
        currentTask.todoList = currentTodos;
      } else {
        currentTask.todoList = [];
        currentTask.status = 'active';
        return;
      }
      const completedTodoList = currentTask.todoList.filter((todo) => {
        return todo.status === 'done';
      });
      if (completedTodoList.length === currentTask.todoList.length) {
        currentTask.status = 'done';
      } else {
        currentTask.status = 'active';
      };
    },
    completeTodo(state, action) {
      const currentTask = state.find(task => task.id === action.payload.parentTaskID);
      currentTask.todoList.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.status = 'done';
        }
      });
      const completedTodoList = currentTask.todoList.filter((todo) => {
        return todo.status === 'done';
      });
      if (completedTodoList.length === currentTask.todoList.length) {
        currentTask.status = 'done';
      };
    },
  },
});

export const { addTask, deleteTask, completeTask, addTodo, deleteTodo, completeTodo } = taskSlice.actions;
export const { reducer: taskReducer } = taskSlice;