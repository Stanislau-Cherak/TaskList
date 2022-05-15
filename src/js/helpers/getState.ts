import { StateTasksType, StateTodosType, MessageType } from '../types/types'

export const getStateTasks = (state):StateTasksType => {
  return state.tasks;
};

export const getStateTodos = (state):StateTodosType => {
  return state.todos;
};

export const getStateMessage = (state):MessageType => {
  return state.message;
};