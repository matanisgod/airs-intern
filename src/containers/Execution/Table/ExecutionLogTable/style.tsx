import { styled, Box, Button } from '@mui/material';

import { CreateButton } from '@components';

export const ExecutionLogTableBox = styled(Box)(() => ({
  width: '35%',
  height: '95%',
  display: 'flex',
  alignSelf: 'center',
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

export const CreateExecutionButton = styled(CreateButton)(() => ({
  width: '200px',
  height: '50px',
  fontSize: '20px',
}));
export const StopAllButton = styled(Button)(() => ({
  width: '80%',
  height: '80%',
  color: 'white',
  backgroundColor: '#6d7785',
  textTransform: 'none',
  fontSize: '20px',
  '&:hover': {
    background: '#888888',
  },
}));
export const StopButton = styled(Button)(() => ({
  width: '80%',
  height: '80%',
  color: 'white',
  backgroundColor: '#444444',
  textTransform: 'none',
  fontSize: '14px',
  '&:hover': {
    background: '#888888',
  },
}));
