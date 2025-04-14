import { Box, styled } from '@mui/material';

export const DetailsTableBox = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignSelf: 'flex-end',
  marginTop: '5px',
  marginBottom: '5px',
  flexDirection: 'column',
  '& .resultColor.true': {
    color: '#55ff55',
  },
  '& .resultColor.false': {
    color: '#ff5555 ',
  },
}));
