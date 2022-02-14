export type StatusType = 'active' | 'done'

export type PreFilterType = 'all' | StatusType;

export type TodoType = {
  parentTaskID: string;
  description: string;
  status: StatusType;
  id: string;
}

export type TodoListType = TodoType[];

export type TaskType = {
  name: string;
  todoList: TodoListType;
  status: StatusType;
  id: string;
}