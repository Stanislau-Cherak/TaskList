import { AxiosRequestConfig } from "axios";

import { TaskType, TodoType } from "../types/types";

export const axiosGETTasks: AxiosRequestConfig = {
  method: 'GET',
  url: 'http://localhost:4221/tasks',
};

export function axiosPOSTTask(data: TaskType): AxiosRequestConfig {
  return {
    method: 'POST',
    url: 'http://localhost:4221/tasks',
    data: data,
  }
};

export function axiosDELETETask(id: string): AxiosRequestConfig {
  return {
    method: 'DELETE',
    url: `http://localhost:4221/tasks/${id}`,
  }
};

export function axiosPATCHTask(id: string): AxiosRequestConfig {
  return {
    method: 'PATCH',
    url: `http://localhost:4221/tasks/${id}`,
    data: {
      status: 'done',
    },
  }
};

export function axiosPOSTTodo(data: TodoType): AxiosRequestConfig {
  const { parentTaskID } = data;
  return {
    method: 'POST',
    url: `http://localhost:4221/tasks/${parentTaskID}`,
    data: data,
      
  }
};


