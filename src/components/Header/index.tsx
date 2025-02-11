import React from 'react';

import { Box, styled } from '@mui/material';

const HeaderBox = styled(Box)(() => ({
  fontSize: '40px',
  color: 'white',
  fontWeight: 'bolder',
  left: '40px',
  top: '25px',
  position: 'fixed',
}));

export const Header = () => {
  return <HeaderBox>PQ Automation Test</HeaderBox>;
};
