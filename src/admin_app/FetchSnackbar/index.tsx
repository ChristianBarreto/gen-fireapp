import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert, { AlertColor } from '@mui/material/Alert';

type SnackData = {
  open: boolean,
  severity: AlertColor,
  text: string,
}

export default function FetchSnackbar({
  snackData,
  setSnackData,
}: {
  snackData: SnackData,
  setSnackData: (data: SnackData) => void
}) {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackData({
      ...snackData,
      open: false
    });
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={snackData.open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackData.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >{snackData.text}</Alert>
      </Snackbar>
    </div>
  );
}
