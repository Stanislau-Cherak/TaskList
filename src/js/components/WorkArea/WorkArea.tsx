import React from "react";
import { useLocation } from "react-router-dom";

import { useAppSelector } from "../../hooks/hooks";

import { Grid, Box, Typography } from "@mui/material";

import { PreFilterType, TaskType } from '../../types/types';

import TaskList from '../TaskList/TaskList';
import TodoList from '../TodoList/TodoList';

interface WorkAreaProps {
  preFilter: PreFilterType,
  searchMask: string,
}

const WorkArea: React.FC<WorkAreaProps> = ({ preFilter, searchMask }) => {

  const location = useLocation();
  const id = location.state;
  const tasks: TaskType[] = useAppSelector(state => state.tasks);

  const selected = id ? true : false;

  const selectedTask = tasks.find((task) => task.id === id);

  const prefilteredTasks = (preFilter === 'all'
    ? tasks
    : tasks.filter((task) => task.status === preFilter)
  );

  const postfilteredTasks = prefilteredTasks.filter((task) => {
    return task.name.toLowerCase().includes(searchMask.toLowerCase())
  }
  );  

  return (
    <Box>

      {tasks.length != 0
        ?
        <Grid
          container
          spacing={4}
          justifyContent='space-between'
        >

          <Grid item xs={6} md={4}>
            <TaskList
              filteredTasks={postfilteredTasks}
              selectedTask={selectedTask}
              selected={selected}
              prefilter={preFilter}
            />
          </Grid>

          <Grid item xs={6} md={8}>
            <TodoList selectedTask={selectedTask} selected={selected} />
          </Grid>

        </Grid>
        : <Typography
          variant='h5'
          component='div'
          textAlign={'center'}
        >
          You have no tasks.
        </Typography>
      }

    </Box>
  )

}

export default WorkArea;