import { AxiosRequestConfig } from "axios";

import { TaskType } from "../types/types";

export const axiosOptionsGetTasks: AxiosRequestConfig = {
  method: 'GET',
  url: 'http://localhost:4221/tasks',
};

export function axiosOptionsAddTask(data: TaskType): AxiosRequestConfig {
  return {
    method: 'POST',
    url: 'http://localhost:4221/tasks',
    data: data,
  }
};

export function axiosOptionsDeleteTask(id: string): AxiosRequestConfig {
  return {
    method: 'DELETE',
    url: `http://localhost:4221/tasks/${id}`,
  }
};

export function axiosOptionsCompleteTask(id: string): AxiosRequestConfig {
  return {
    method: 'PATCH',
    url: `http://localhost:4221/tasks/${id}`,
    data: {
      status: 'done'
    },
  }
};


