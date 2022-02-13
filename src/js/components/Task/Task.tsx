import React from "react";

import { Box, Paper, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

import { green, orange } from '@mui/material/colors';

const greenColor = green[500];
const orangeColor = orange[800];

interface TaskProps {
  name: string,
  state: 'active' | 'done',
}

const Task: React.FC<TaskProps> = ({ name, state }) => {

  const color = (state === 'done' ? greenColor : orangeColor);

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
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          color='inherit'
        >
          <DeleteIcon />
        </IconButton>
      </Paper>
    </Box >
  )
}

export default Task;
