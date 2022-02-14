import React from "react";

import { useAppSelector } from '../hooks/hooks';

import { Box } from '@mui/material';

import { TaskType, PreFilterType } from "../../types/types";

import Task from "../Task/Task";

interface TasksListProps {
  preFilter: PreFilterType,
}

const TaskList: React.FC<TasksListProps> = ({ preFilter }) => {

  const tasks: TaskType[] = useAppSelector(state => state.tasks);

  const prefilteredTasks = (preFilter === 'all'
    ? tasks
    : tasks.filter((task) => task.status === preFilter)
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {
        prefilteredTasks.map((task: TaskType) => {
          return (
            <Task key={task.id} {...task} />
          )
        })
      }
    </Box>
  )
}

export default TaskList;
