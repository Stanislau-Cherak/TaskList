import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface CustomBackdropProps {
  isOpen: boolean
}

const CustomBackdrop: React.FC<CustomBackdropProps> = ({ isOpen }) => {

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: 2 }}
        open={isOpen}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
}

export default CustomBackdrop;