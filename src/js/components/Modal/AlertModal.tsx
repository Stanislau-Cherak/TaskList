import React from 'react';
import { Backdrop, Box, Modal, Fade, Button, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

const redColor = red[500];

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  borderColor: redColor,
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
};

interface AlertModalProps {
  isOpen: boolean;
  alertMessage: string;
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ isOpen, alertMessage, onClose }) => {

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>

            <Typography
              variant='h6'
              component='span'
              sx={{ 
                flexGrow: 1,
                mb: 2, 
              }}
            >
              {alertMessage}
            </Typography>

            <Button            
              variant='contained'
              color="error"
              onClick={onClose}
            >
              Ok
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default AlertModal; 
