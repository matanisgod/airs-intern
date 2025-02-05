import { keyframes, styled, Typography } from '@mui/material';

export const ExampleText = styled(Typography)(() => ({
  fontSize: '10rem',
  color: '#f2f2f2',
  fontWeight: 'normal',
  marginRight: 30,
  display: 'flex',
  animation: `${textAnimation} 3s infinite`,
}));

const textAnimation = keyframes`
 0% { font-size: 10rem; }
 50% { font-size: 13rem; }
 100% { font-size: 10rem; }
`;
