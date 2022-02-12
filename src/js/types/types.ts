export type todoType = {
  parentTaskID: string;
  description: string;
  state: 'active' | 'done';
  id: string;
}

export type todoListType = todoType[];

export type TaskType = {
  name: string;
  todoList: todoListType;
  state: 'active' | 'done';
  id: string;
}