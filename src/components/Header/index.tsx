import React from 'react';

import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import { HeaderBox, PageButton } from './style';

export const Header = () => {
  const navi = useNavigate();
  const loca = useLocation();
  return (
    <React.Fragment>
      <HeaderBox>PQ Automation Test</HeaderBox>
      {loca.pathname === '/execution' && (
        <PageButton onClick={() => navi('/caseset')}>Move to caseset</PageButton>
      )}
      {loca.pathname === '/caseset' && (
        <PageButton onClick={() => navi('/execution')}>Move to execution</PageButton>
      )}
      <Outlet />
    </React.Fragment>
  );
};
