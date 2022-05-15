import { AlertColor } from "@mui/material/Alert"

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
  status: StatusType;
  id: string;
}

export type MessageType = {
  show: boolean;
  message: string;
  duration: number;
  severity: AlertColor;
}

export type StateTasksType={
  tasks: TaskType[];
  status: null|'loading'|'resolved'|'rejected';
  error: null|string;
}

export type StateTodosType={
  todos: TodoListType;
  status: null|'pending'|'loading'|'resolved'|'rejected';
  error: string;
}