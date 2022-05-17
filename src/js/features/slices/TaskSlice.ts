import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';

import { setMessage } from './MessageSlice';

import axios from 'axios';

import {
  axiosGETTasks,
  axiosPOSTTask,
  axiosDELETETask,
  axiosPATCHTask,
} from '../../helpers/axiosRequest';

import { TaskType, StateTasksType } from '../../types/types';

import { createMessage } from '../../helpers/createMessage';

import { setError } from '../../helpers/setError';

export const getTasks = createAsyncThunk<TaskType[], undefined, { rejectValue: string }>(
  'task/getTasks',
  async function (_, { rejectWithValue }) {
    const response = await axios.request<TaskType[]>(axiosGETTasks);
    if (response.status !== 200) {
      return rejectWithValue('Server Error!')
    }
    return response.data;
  }
);

export const asyncAddTask = createAsyncThunk<TaskType, TaskType, { rejectValue: string }>(
  'task/asyncAddTask',
  async function (task: TaskType, { dispatch, rejectWithValue }) {
    const response = await axios.request(axiosPOSTTask(task));
    const data = await response.data;
    const status = await response.status;
    if (status !== 201) {
      return rejectWithValue(`Can't add task. Server error`);
    }
    dispatch(setMessage(createMessage('success', 'New task succesfully added!')));
    return data as TaskType;
  }
);

export const asyncDeleteTask = createAsyncThunk<string, string, { rejectValue: string }>(
  'task/asyncDeleteTask',
  async function (id: string, { dispatch, rejectWithValue }) {
    const response = await axios.request(axiosDELETETask(id));
    const status = await response.status;
    if (status !== 200) {
      return rejectWithValue(`Can't delete task. Server error`);
    }
    dispatch(setMessage(createMessage('error', 'You have deleted the task!')));
    return id;
  }
);

export const asyncToggleTask = createAsyncThunk<string, string, { rejectValue: string, state: { tasks: StateTasksType } }>(
  'task/asyncToggleTask',
  async function (id: string, { dispatch, rejectWithValue, getState }) {
    const task = getState().tasks.tasks.find(task => task.id === id);
    if (task) {
      const newStatus = (task.status === 'active' ? 'done' : 'active');
      const response = await axios.request(axiosPATCHTask(id, newStatus));
      const status = await response.status;
      if (status !== 200) {
        return rejectWithValue(`Can't mark task. Server error`);
      }
      dispatch(setMessage(createMessage('warning', `You marked the task as ${newStatus}!`)));
      return id;
    }
  }
)

const initialState: StateTasksType = {
  tasks: [],
  status: null,
  error: null,
}

const taskSlice = createSlice({
  name: 'TASK',
  initialState: initialState,
  reducers: {
    resetTaskError(state) {
      state.status = 'resolved';
      state.error = null;      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.tasks = action.payload;
      })
      .addCase(asyncAddTask.pending, (state) => {
        state.error = null;
      })
      .addCase(asyncAddTask.fulfilled, (state, action: PayloadAction<TaskType>) => {
        state.tasks.push({ ...action.payload });
      })
      .addCase(asyncDeleteTask.pending, (state) => {
        state.error = null;
      })
      .addCase(asyncDeleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(asyncToggleTask.pending, (state) => {
        state.error = null;
      })
      .addCase(asyncToggleTask.fulfilled, (state, action: PayloadAction<string>) => {
        const task = state.tasks.find(todo => todo.id === action.payload);
        if (task) {
          const newStatus = (task.status === 'active' ? 'done' : 'active')
          task.status = newStatus;
        }
      })
      .addMatcher(setError, (state, action: AnyAction) => {
        state.error = action.error.message.concat('','.');
        state.status = 'rejected';
      })
  }
});

export const {resetTaskError}=taskSlice.actions;
export const { reducer: taskReducer } = taskSlice;