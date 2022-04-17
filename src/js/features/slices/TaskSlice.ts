import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { setMessage } from './MessageSlice';

import axios from 'axios';

import {
  axiosGETTasks,
  axiosPOSTTask,
  axiosDELETETask,
  axiosPATCHTask,
  axiosPOSTTodo,
} from '../../helpers/axiosRequest';

import { TaskType, TodoListType, TodoType } from '../../types/types';

import { createMessage } from '../../helpers/createMessage';

export const getTasks = createAsyncThunk(
  'task/getTasks',
  async function () {
    const response = await axios.request<TaskType[]>(axiosGETTasks);
    return response.data;
  }
);

export const asyncAddTask = createAsyncThunk(
  'task/asyncAddTask',
  async function (task: TaskType, { dispatch }) {
    const response = await axios.request(axiosPOSTTask(task));
    const data = await response.data;
    const status = await response.status;
    if (status === 201) {
      dispatch(addTask(data));
      dispatch(setMessage(createMessage('success', 'New task succesfully added!')));

    }
  }
);

export const asyncDeleteTask = createAsyncThunk(
  'task/asyncDeleteTask',
  async function (id: string, { dispatch }) {
    const response = await axios.request(axiosDELETETask(id));
    const status = await response.status;
    if (status === 200) {
      dispatch(deleteTask({ id }));
      dispatch(setMessage(createMessage('error', 'You have deleted the task!')));
    }
  }
);

export const asyncCompleteTask = createAsyncThunk(
  'task/asyncCompleteTeask',
  async function (id: string, { dispatch }) {
    const response = await axios.request(axiosPATCHTask(id));
    const status = await response.status;
    if (status === 200) {
      dispatch(completeTask({ id }));
      dispatch(setMessage(createMessage('warning', 'You marked the task as completed!')));
    }
  }
)

export const asyncAddTodo=createAsyncThunk(
  'task/asyncAddTodo',
  async function (todo: TodoType, {dispatch}) {
    const response=await axios.request(axiosPOSTTodo(todo));
    const data= await response.data;
    const status =await response.status;
    if (status===200) {
      dispatch(addTodo(data));
      dispatch(setMessage({ severity: 'success', message: 'New job succesfully added!', show: true }));
    }
  }
)

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const taskSlice = createSlice({
  name: 'TASK',
  initialState: {
    tasks: [],
    status: null,
    error: null,
  },
  reducers: {
    addTask(state, action) {
      state.tasks.push({ ...action.payload });
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    completeTask(state, action) {
      state.tasks.forEach((task) => {
        if (task.id === action.payload.id) {
          task.status = 'done';
          task.todoList.forEach(todo => todo.status = 'done');
        }
      });
    },
    addTodo(state, action) {
      const currentTask = state.tasks.find(task => task.id === action.payload.parentTaskID);
      currentTask.todoList.push({ ...action.payload });
      currentTask.status = 'active';
    },
    deleteTodo(state, action) {
      const currentTask = state.tasks.find(task => task.id === action.payload.parentTaskID);
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
      const currentTask = state.tasks.find(task => task.id === action.payload.parentTaskID);
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
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.tasks = action.payload;
    })
    builder.addCase(getTasks.rejected, setError)
  }
});

export const { addTask, deleteTask, completeTask, addTodo, deleteTodo, completeTodo } = taskSlice.actions;
export const { reducer: taskReducer } = taskSlice;