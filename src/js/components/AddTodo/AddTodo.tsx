import React, { useState } from "react";

import { useAppDispatch } from "../../hooks/hooks";

import { Box, Button, TextField } from '@mui/material';

import { asyncAddTodo } from "../../features/slices/TodoSlice";
import { createTodo } from '../../helpers/createTodo';

interface AddTodoProps {
  taskID: string,
}

const AddTodo: React.FC<AddTodoProps> = ({ taskID }) => {

  const dispatch = useAppDispatch();

  const [newJob, setNewJob] = useState<string>('');

  const handleAddInputChange = (event): void => {
    setNewJob(event.target.value);
  }

  const handleAddTodo = (): void => {
    const todo = createTodo(taskID, newJob.trim(), 'active');
    dispatch(asyncAddTodo(todo));
    setNewJob('');
  }

  return (

    <Box
      sx={{
        display: 'flex',
        mb: 3,
      }}
    >
      <TextField
        label='Add new job'
        id='outlined-size-small'
        value={newJob}
        size='small'
        sx={{
          mr: 2,
          flexGrow: 1,
        }}
        onChange={handleAddInputChange}
      />
      <Button
        variant='contained'
        onClick={handleAddTodo}
      >
        Add
      </Button>
    </Box>

  )
}

export default AddTodo;
