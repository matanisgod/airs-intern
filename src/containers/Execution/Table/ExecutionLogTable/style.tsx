import { styled, Box, Button } from '@mui/material';

import { DecisionButton } from '@components';

export const ExecutionLogTableBox = styled(Box)(() => ({
  width: '40%',
  height: '100%',
  display: 'flex',
  alignSelf: 'center',
  padding: '10px',
  flexDirection: 'column',
  '& .statusColor.running': {
    color: '#55ff55',
  },
  '& .statusColor.cancelled': {
    color: '#ff5555',
  },
  '& .statusColor.error': {
    color: '#ffaa55',
  },
  '& .statusColor.done': {
    color: '#ffffff ',
  },
}));

export const ActionButton = styled(DecisionButton)(() => ({
  width: '50px',
  minWidth: '50px',
  height: '50px',
  fontSize: '50px',
  padding: '0px',
  background: '#232A3E',
  '&:hover': {
    background: '#232A3E',
  },
}));
export const StopButton = styled(Button)(() => ({
  width: '80%',
  height: '80%',
  color: 'white',
  background: '#444444',
  textTransform: 'none',
  fontSize: '14px',
  '&:hover': {
    background: '#888888',
  },
}));
