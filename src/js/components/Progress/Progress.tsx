import React from "react";

import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { Typography, Box } from '@mui/material';

function Progress(props: LinearProgressProps & { value: number }) {
  return (
    <Box
      sx={{
        mb:3,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant='h6'
          color='primary'>
          {`${Math.round(props.value,)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default Progress;
