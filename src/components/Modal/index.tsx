import { Modal, styled } from '@mui/material';

export const CommonModal = styled(Modal)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  overflow: 'scroll',
  left: '40px',
  top: '200px',
  position: 'fixed',
}));
