import { TaskType } from "../types/types";
import uniqid from 'uniqid';

export function getTask(name = 'task', todoList = [], state: 'active' | 'done' = 'active'): TaskType {
  return {
    name: name,
    todoList: todoList,
    state: state,
    id: uniqid('task-')
  }
};