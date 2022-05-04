import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { setMessage } from './MessageSlice';

import axios from 'axios';

import {
  axiosGETTasks,
  axiosPOSTTask,
  axiosDELETETask,
  axiosPATCHTask,
  axiosPATCHTaskUncomplete
} from '../../helpers/axiosRequest';

import { TaskType } from '../../types/types';

import { createMessage } from '../../helpers/createMessage';
import { setError } from '../../helpers/setError';

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
      dispatch(deleteTask(id));
      dispatch(setMessage(createMessage('error', 'You have deleted the task!')));
    }
  }
);

export const asyncUncompleteTask = createAsyncThunk(
  'task/asyncCompleteTask',
  async function (id: string, { dispatch }) {
    const response = await axios.request(axiosPATCHTaskUncomplete(id));
    const status = await response.status;
    if (status === 200) {
      dispatch(uncompleteTask(id));
      dispatch(setMessage(createMessage('warning', 'You marked the task as active!')));
    }
  }
)

export const asyncCompleteTask = createAsyncThunk(
  'task/asyncCompleteTask',
  async function (id: string, { dispatch }) {
    const response = await axios.request(axiosPATCHTask(id));
    const status = await response.status;
    if (status === 200) {
      dispatch(completeTask(id));
      dispatch(setMessage(createMessage('warning', 'You marked the task as completed!')));
    }
  }
)

const taskSlice = createSlice({
  name: 'TASK',
  initialState: {
    tasks: [],
    status: null,
    error: null,
  },
  reducers: {
    addTask(state, action: PayloadAction<TaskType>) {
      state.tasks.push({ ...action.payload });
    },
    deleteTask(state, action:PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    completeTask(state, action:PayloadAction<string>) {
      state.tasks.forEach((task) => {
        if (task.id === action.payload) {
          task.status = 'done';
        }
      });
    },
    uncompleteTask(state, action:PayloadAction<string>) {
      state.tasks.forEach((task) => {
        if (task.id === action.payload) {
          task.status = 'active';
        }
      });
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

export const { addTask, deleteTask, completeTask, uncompleteTask } = taskSlice.actions;
export const { reducer: taskReducer } = taskSlice;