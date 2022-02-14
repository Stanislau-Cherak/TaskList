import { TaskType, StatusType } from "../types/types";
import uniqid from 'uniqid';

export function createTask(name = 'task', todoList = [], status: StatusType = 'active'): TaskType {
  return {
    name: name,
    todoList: todoList,
    status: status,
    id: uniqid('task-')
  }
};