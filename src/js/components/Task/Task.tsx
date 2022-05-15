import React from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import { Box, Paper, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

import { blue, green, orange } from '@mui/material/colors';

import { asyncDeleteTask, asyncToggleTask } from "../../features/slices/TaskSlice";
import { asyncDeleteTodos, asyncCompleteTodos, asyncCompleteTodo, asyncDeleteTodo } from "../../features/slices/TodoSlice";

import { convertToLink } from "../../helpers/convertToLink";

import { getStateTodos } from "../../helpers/getState";

import { StatusType, TodoListType } from "../../types/types";

const doneColor = green[500];
const activeColor = orange[500];
const primaryColor = blue[700];

interface TaskProps {
  name: string;
  status: StatusType;
  id: string;
  selected?: boolean,
}

const Task: React.FC<TaskProps> = ({ name, status, id, selected }) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const todos: TodoListType = useAppSelector(getStateTodos).todos.filter(todo => todo.parentTaskID === id);

  const handleCompleteTask = (): void => {
    dispatch(asyncToggleTask(id));
    dispatch(asyncCompleteTodos(todos));
  }

  const handleDeleteTask = (): void => {
    dispatch(asyncDeleteTask(id));
    dispatch(asyncDeleteTodos(todos))
    if (selected) {
      navigate('/');
    }
  }

  const hadleSelectTask = () => {
    navigate(`/Task/${convertToLink(name)}`, { state: id });
  }

  const color = selected ? primaryColor : (status === 'done' ? doneColor : activeColor);
  const cursor = selected ? 'default' : 'pointer';

  return (
    <Box
      sx={{
        mb: 3,
        cursor: cursor,
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
          onClick={hadleSelectTask}
        >
          {name}
        </Typography>
        {
          (status === 'active')
          &&
          <IconButton
            color='inherit'
            onClick={handleCompleteTask}
          >
            <CheckIcon />
          </IconButton>
        }
        <IconButton
          color='inherit'
          onClick={handleDeleteTask}
        >
          <DeleteIcon />
        </IconButton>
      </Paper>
    </Box >
  )
}

export default Task;
