import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { setMessage } from './MessageSlice';

import axios from 'axios';

import {
  axiosGETTodos,
  axiosPOSTTodo,
  axiosDELETETodo,
  axiosPATCHTodo
} from '../../helpers/axiosRequest';

import { TodoListType, TodoType } from '../../types/types';

import { createMessage } from '../../helpers/createMessage';
import { setError } from '../../helpers/setError';

export const getTodos = createAsyncThunk(
  'todo/getTodos',
  async function () {
    const response = await axios.request<TodoListType>(axiosGETTodos);
    return response.data;
  }
);

export const asyncAddTodo = createAsyncThunk(
  'todo/asyncAddTodo',
  async function (todo: TodoType, { dispatch }) {
    const response = await axios.request(axiosPOSTTodo(todo));
    const data = await response.data;
    const status = await response.status;
    if (status === 201) {
      dispatch(addTodo(data));
      dispatch(setMessage(createMessage('success', 'New job succesfully added!')));
    }
  }
)

export const asyncDeleteTodo = createAsyncThunk(
  'todo/asyncDeleteTodo',
  async function (id: string, { dispatch }) {
    const response = await axios.request(axiosDELETETodo(id));
    const status = await response.status;
    if (status === 200) {
      dispatch(deleteTodo({ id }));
      dispatch(setMessage(createMessage('error', 'You have deleted the job!')));
    }
  }
);

export const asyncCompleteTodo = createAsyncThunk(
  'todo/asyncCompleteTodo',
  async function (id: string, { dispatch }) {
    const response = await axios.request(axiosPATCHTodo(id));
    const status = await response.status;
    if (status === 200) {
      dispatch(completeTodo({ id }));
      dispatch(setMessage(createMessage('warning', 'You marked the job as completed!')));
    }
  }
)

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push({ ...action.payload });
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    completeTodo(state, action) {
      state.todos.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.status = 'done';
        }
      });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTodos.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.todos = action.payload;
    })
    builder.addCase(getTodos.rejected, setError)
  }
});

export const { addTodo, deleteTodo, completeTodo } = todoSlice.actions;
export const { reducer: todoReducer } = todoSlice;