import { AxiosRequestConfig } from "axios";

import { TaskType } from "../types/types";

export const axiosOptionsGetTasks: AxiosRequestConfig = {
  method: 'GET',
  url: 'http://localhost:4221/tasks',
};

export function axiosOptionsAddTasks(data: TaskType): AxiosRequestConfig {
  return {
    method: 'POST',
    url: 'http://localhost:4221/tasks',
    data: data,
  }
};



