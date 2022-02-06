import React from "react";
import { Alert, Snackbar } from "@mui/material";

import { AlertColor } from "@mui/material/Alert"

interface SnackProps {
  isOpen: boolean;
  text: string;
  duration: number;
  severity: AlertColor;
  onClose: () => void;
}

const Snack: React.FC<SnackProps> = ({ isOpen, text, duration, severity, onClose }) => {
  return (
    <Snackbar
      open={isOpen}
      onClose={onClose}
      autoHideDuration={duration}
    >
      <Alert
        severity={severity}
      >
        {text}
      </Alert>
    </Snackbar>
  )
}

export default Snack;
