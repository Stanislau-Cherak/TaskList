import { TodoType, StatusType } from "../types/types";

import uniqid from 'uniqid';

export function createTodo(parentTaskID, description = '', status: StatusType = 'active'): TodoType {
  return {
    parentTaskID: parentTaskID,
    description: description,
    status: status,
    id: uniqid('todo-')
  }
}