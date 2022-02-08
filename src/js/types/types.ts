export type todoListType={
  parentTask: string;
  description: string;
  state: 'active'| 'done';
  id: string;
}

export type TaskType={
  name:string;
  todoList: todoListType[];
  state:'active'| 'done';
  id: string;
}