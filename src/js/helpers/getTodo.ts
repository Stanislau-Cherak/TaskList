import { todoType } from "../types/types";

import uniqid from 'uniqid';

export function getTodo(parentTaskID, description = '', state: 'active' | 'done' = 'active'): todoType {
  return {
    parentTaskID: parentTaskID,
    description: description,
    state: state,
    id: uniqid('todo-')
  }
}