import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Button } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { TaskType, PreFilterType } from "../../types/types";

import Task from "../Task/Task";

interface TasksListProps {
  filteredTasks: TaskType[],
  selectedTask: TaskType,
  selected: boolean,
  prefilter: PreFilterType,
}

const TaskList: React.FC<TasksListProps> = ({ filteredTasks, selectedTask, selected, prefilter }) => {

  const navigate=useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {selected
        ?
        <>
          <Button
            variant='contained'
            sx={{
              mb: 2.5,
              maxWidth: 130,

            }}
            onClick={() => navigate('/')}
          >
            <ArrowBackIcon
              sx={{
                mr: 2,
              }}
            />
            Go back
          </Button>
          <Task selected={true} {...selectedTask} />
        </>
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
