import React from "react";

import { Box, Paper, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

import { green, orange } from '@mui/material/colors';

import { StatusType } from "../../types/types";

const doneColor = green[500];
const activeColor = orange[800];

interface TodoProps {
  description: string,
  status: StatusType,
  id: string,
}

const Todo: React.FC<TodoProps> = ({ description, status, id }) => {

  const color = (status === 'done' ? doneColor : activeColor);

  return (
    <Box
      sx={{
        mb: 3,
        cursor: 'pointer'
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
            onClick={() => console.log('check')}
          >
            <CheckIcon />
          </IconButton>
        }
        <IconButton
          color='inherit'
          onClick={()=>console.log('delete')}
        >
          <DeleteIcon />
        </IconButton>
      </Paper>
    </Box >
  )
}

export default Todo;
