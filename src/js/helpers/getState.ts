import { TaskType, TodoListType, MessageType } from '../types/types'

type StateTasksType={
  tasks: TaskType[];
  status: null|'loading'|'resolved'|'rejected';
  error: string;
}

type StateTodosType={
  todos: TodoListType;
  status: null|'loading'|'resolved'|'rejected';
  error: string;
}

export const getStateTasks = (state):StateTasksType => {
  return state.tasks;
};

export const getStateTodos = (state):StateTodosType => {
  return state.todos;
};

export const getStateMessage = (state):MessageType => {
  return state.message;
};