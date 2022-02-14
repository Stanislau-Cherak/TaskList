import React, { useState } from "react";

import { useAppDispatch } from "../hooks/hooks";

import { Box, Paper, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

import { blue, green, orange } from '@mui/material/colors';

import { deleteTask, changeTaskStatus } from "../../features/Task/TaskSlice";

import { StatusType } from "../../types/types";

const doneColor = green[500];
const activeColor = orange[800];
const primaryColor = blue[500];

interface TaskProps {
  name: string,
  status: StatusType,
  id: string,
}

const Task: React.FC<TaskProps> = ({ name, status, id }) => {

  const dispatch = useAppDispatch();

  const [currentStatus, setCurrentStatus] = useState<StatusType>(status);

  const handleStatusChange = (): void => {
    const newStatus: StatusType = (status === 'active' ? 'done' : 'active');
    setCurrentStatus(newStatus);
    dispatch(changeTaskStatus({ id, status: newStatus }));
  }

  const color = (status === 'done' ? doneColor : activeColor);

  return (
    <Box
      sx={{
        mb: 3
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          backgroundColor: color,
          color: 'white'
        }}
      >
        <Typography
          variant='h5'
          component='div'
          sx={{
            px: 2,
            py: 1,
            flexGrow: 1,
          }}
        >
          {name}
        </Typography>
        <IconButton
          color='inherit'
          onClick={handleStatusChange}
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          color='inherit'
          onClick={() => dispatch(deleteTask(id))}
        >
          <DeleteIcon />
        </IconButton>
      </Paper>
    </Box >
  )
}

export default Task;
