import React from "react";

import { useAppDispatch } from "../../hooks/hooks";

import { Box, Paper, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

import { asyncCompleteTodo, asyncDeleteTodo } from "../../features/slices/TodoSlice";
import { setMessage } from "../../features/slices/MessageSlice";

import { green, orange } from '@mui/material/colors';

import { TodoType } from "../../types/types";

import { createMessage } from "../../helpers/createMessage";

const doneColor = green[500];
const activeColor = orange[500];

const Todo: React.FC<TodoType> = ({ description, status, id }) => {

  const dispatch = useAppDispatch();

  const color = (status === 'done' ? doneColor : activeColor);

  const handleDeleteTodo = (): void => {
    dispatch(asyncDeleteTodo(id));
  }

  const handleCompleteTodo = (): void => {
    dispatch(asyncCompleteTodo(id));
  }

  return (
    <Box
      sx={{
        mb: 3,
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
          {description}
        </Typography>
        {
          (status === 'active')
          &&
          <IconButton
            color='inherit'
            onClick={handleCompleteTodo}
          >
            <CheckIcon />
          </IconButton>
        }
        <IconButton
          color='inherit'
          onClick={handleDeleteTodo}
        >
          <DeleteIcon />
        </IconButton>
      </Paper>
    </Box >
  )
}

export default Todo;
