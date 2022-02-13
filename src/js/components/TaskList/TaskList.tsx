import React from "react";

import { useAppSelector } from '../hooks/hooks';

import { Box } from '@mui/material';

import { TaskType } from "../../types/types";

import Task from "../Task/Task";

const TaskList: React.FC = () => {

  const tasks: TaskType[] = useAppSelector(state => state.tasks);

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column'
    }}    
    >
      {
        tasks.map((task: TaskType) => {
          return (
            <Task key={task.id} name={task.name} state={task.state} />
          )
        })
      }
    </Box>
  )
}

export default TaskList;
