import React from "react";
import { useLocation } from "react-router-dom";

import { useAppSelector } from "../../hooks/hooks";

import { Grid, Box, Typography } from "@mui/material";

import { getStateTasks } from "../../helpers/getState";

import { PreFilterType } from '../../types/types';

import TaskList from '../TaskList/TaskList';
import TodoList from '../TodoList/TodoList';

interface WorkAreaProps {
  preFilter: PreFilterType,
  searchMask: string,
}

const WorkArea: React.FC<WorkAreaProps> = ({ preFilter, searchMask }) => {

  const location = useLocation();
  const id = location.state;
  const { tasks } = useAppSelector(getStateTasks);

  const selected = id ? true : false;

  const selectedTask = tasks.find((task) => task.id === id);

  const taskStatus = selectedTask?.status;

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
          direction='row'
          justifyContent='space-between'
        >

          <Grid item xs={12} sm={5} md={4}>
            <TaskList
              filteredTasks={postfilteredTasks}
              selectedTask={selectedTask}
              selected={selected}
              prefilter={preFilter}
            />
          </Grid>

          <Grid item xs={12} sm={7} md={8}>
            <TodoList
              taskID={id}
              status={taskStatus}
              selected={selected}
              preFilter={preFilter}
              searchMask={searchMask}
            />
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
