import React from "react";

import { Box, Typography } from '@mui/material';

import { TaskType, PreFilterType } from "../../types/types";

import Task from "../Task/Task";

interface TasksListProps {
  filteredTasks: TaskType[],
  selectedTask: TaskType,
  selected: boolean,
  prefilter: PreFilterType,
}

const TaskList: React.FC<TasksListProps> = ({ filteredTasks, selectedTask, selected, prefilter }) => {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {selected
        ?
        <Task selected={true} {...selectedTask} />
        : <>
          {filteredTasks.length != 0
            ?
            filteredTasks?.map((task: TaskType) => {
              return (
                <Task key={task.id} {...task} />
              )
            })
            :
            <Typography
              variant='h5'
              component='span'
              textAlign={'center'}
            >
              {prefilter === 'active'
                ?
                `You don't have any active tasks.`
                :
                `You don't have completed tasks.`
              }
            </Typography>
          }
        </>
      }
    </Box>
  )
}

export default TaskList;
