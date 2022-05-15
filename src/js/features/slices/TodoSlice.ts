import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { setMessage } from './MessageSlice';

import axios from 'axios';

import {
  axiosGETTodos,
  axiosPOSTTodo,
  axiosDELETETodo,
  axiosPATCHTodo
} from '../../helpers/axiosRequest';

import { TodoListType, TodoType, StateTodosType } from '../../types/types';

import { createMessage } from '../../helpers/createMessage';
import { setError } from '../../helpers/setError';

export const getTodos = createAsyncThunk<TodoListType, undefined, { rejectValue: string }>(
  'todo/getTodos',
  async function (_, { rejectWithValue }) {
    const response = await axios.request<TodoListType>(axiosGETTodos);
    if (response.status !== 200) {
      return rejectWithValue('Server Error!')
    }
    return response.data;
  }
);

export const asyncAddTodos = createAsyncThunk<TodoListType, TodoListType, { rejectValue: string }>(
  'todo/asyncAddTodos',
  async function (todos: TodoListType, { rejectWithValue }) {
    const tempPromiseArray = [];
    const data = [];
    const status = [];
    todos.forEach(todo => tempPromiseArray.push(axios.request(axiosPOSTTodo(todo))));
    const responses = await Promise.all(tempPromiseArray);
    responses.forEach((response) => {
      data.push(response.data);
      status.push(response.status)
    })
    if (status[status.length - 1] !== 201) {
      return rejectWithValue(`Can't add todos. Server error`);
    }
    return data as TodoListType;
  }
)

export const asyncDeleteTodos = createAsyncThunk<TodoListType, TodoListType, { rejectValue: string }>(
  'todo/asyncDeleteTodos',
  async function (todos: TodoListType, { rejectWithValue }) {
    const tempPromiseArray = [];
    const status = [];
    todos.forEach(todo => tempPromiseArray.push(axios.request(axiosDELETETodo(todo.id))));
    const responses = await Promise.all(tempPromiseArray);
    responses.forEach((response) => {
      status.push(response.status)
    })
    if (status[status.length - 1] !== 200) {
      return rejectWithValue(`Can't delete todos. Server error`);
    }
    return todos as TodoListType;
  }
)

export const asyncCompleteTodos = createAsyncThunk<TodoListType, TodoListType, { rejectValue: string }>(
  'todo/asyncCompleteTodos',
  async function (todos: TodoListType, { rejectWithValue }) {
    const tempPromiseArray = [];
    const status = [];
    todos.forEach(todo => tempPromiseArray.push(axios.request(axiosPATCHTodo(todo.id))));
    const responses = await Promise.all(tempPromiseArray);
    responses.forEach((response) => {
      status.push(response.status)
    })
    if (status[status.length - 1] !== 200) {
      return rejectWithValue(`Can't mark todos. Server error`);
    }
    return todos as TodoListType;
  }
)

export const asyncAddTodo = createAsyncThunk<TodoType, TodoType, { rejectValue: string }>(
  'todo/asyncAddTodo',
  async function (todo: TodoType, { dispatch, rejectWithValue }) {
    const response = await axios.request(axiosPOSTTodo(todo));
    const data = await response.data;
    const status = await response.status;
    if (status !== 201) {
      return rejectWithValue(`Can't add todo. Server error`);
    }
    dispatch(setMessage(createMessage('success', 'New job succesfully added!')));
    return data as TodoType;
  }
)

export const asyncDeleteTodo = createAsyncThunk<string, string, { rejectValue: string }>(
  'todo/asyncDeleteTodo',
  async function (id: string, { dispatch, rejectWithValue }) {
    const response = await axios.request(axiosDELETETodo(id));
    const status = await response.status;
    if (status !== 200) {
      return rejectWithValue(`Can't delete task. Server error`);
    }
    dispatch(setMessage(createMessage('error', 'You have deleted the job!')));
    return id;
  }
);

export const asyncCompleteTodo = createAsyncThunk<string, string, { rejectValue: string }>(
  'todo/asyncCompleteTodo',
  async function (id: string, { dispatch, rejectWithValue }) {
    const response = await axios.request(axiosPATCHTodo(id));
    const status = await response.status;
    if (status !== 200) {
      return rejectWithValue(`Can't mark todo. Server error`);
    }
    dispatch(setMessage(createMessage('warning', 'You marked the job as completed!')));
    return id;
  }
)

const initialState: StateTodosType = {
  todos: [],
  status: null,
  error: null,
}

const todoSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.todos = action.payload;
      })
      .addCase(asyncAddTodos.pending, (state) => {
        state.status = 'pending';        
        state.error = null;
      })
      .addCase(asyncAddTodos.fulfilled, (state, action: PayloadAction<TodoListType>) => {
        state.todos.push(...action.payload);
      })
      .addCase(asyncDeleteTodos.pending, (state) => {
        state.status = 'pending';      
        state.error = null;
      })
      .addCase(asyncDeleteTodos.fulfilled, (state, action: PayloadAction<TodoListType>) => {
        state.todos=state.todos.filter(todo=> !action.payload.some(deletedTodo=> deletedTodo.id===todo.id));
      })
      .addCase(asyncCompleteTodos.pending, (state) => {
        state.status = 'pending';      
        state.error = null;
      })
      .addCase(asyncCompleteTodos.fulfilled, (state, action: PayloadAction<TodoListType>) => {
        state.todos.forEach((todo) => {
          if (action.payload.some(comletedTodo=>comletedTodo.id===todo.id)) {
            todo.status = 'done';
          }
        });
      })
      .addCase(asyncAddTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(asyncAddTodo.fulfilled, (state, action: PayloadAction<TodoType>) => {
        state.todos.push({ ...action.payload });
      })
      .addCase(asyncDeleteTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(asyncDeleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(asyncCompleteTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(asyncCompleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.todos.forEach((todo) => {
          if (todo.id === action.payload) {
            todo.status = 'done';
          }
        });
      })
      .addMatcher(setError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.status = 'rejected';
      })
  }
});

export const { reducer: todoReducer } = todoSlice;