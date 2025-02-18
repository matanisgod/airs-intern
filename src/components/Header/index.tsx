import React from 'react';

import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

const HeaderBox = styled(Box)(() => ({
  fontSize: '40px',
  color: 'white',
  fontWeight: 'bolder',
  left: '40px',
  top: '25px',
  position: 'fixed',
}));

export const Header = () => {
  return (
    <React.Fragment>
      <HeaderBox>PQ Automation Test</HeaderBox>
      <Outlet />
    </React.Fragment>
  );
};
