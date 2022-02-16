import React from "react";

import { useAppSelector } from '../hooks/hooks';

import { Box } from '@mui/material';

import { TaskType, PreFilterType } from "../../types/types";

import Task from "../Task/Task";

interface TasksListProps {
  preFilter: PreFilterType,
  searchMask: string,
}

const TaskList: React.FC<TasksListProps> = ({ preFilter, searchMask }) => {

  const tasks: TaskType[] = useAppSelector(state => state.tasks);

  const prefilteredTasks = (preFilter === 'all'
    ? tasks
    : tasks.filter((task) => task.status === preFilter)
  );

  const postfilteredTasks = prefilteredTasks.filter((task) => {
    return task.name.toLowerCase().includes(searchMask.toLowerCase())
  }
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {
        postfilteredTasks.map((task: TaskType) => {
          return (
            <Task key={task.id} {...task} />
          )
        })
      }
    </Box>
  )
}

export default TaskList;
