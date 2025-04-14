import { Box, styled } from '@mui/material';

export const CaseLogTableBox = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignSelf: 'flex-end',
  flexDirection: 'column',
  '& .resultColor.true': {
    color: '#55ff55',
  },
  '& .resultColor.false': {
    color: '#ff5555 ',
  },
}));
