import React from 'react';

import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import { HeaderBox, PageButton } from './style';

export const Header = () => {
  const nextPage = useNavigate();
  const nowPage = useLocation();
  return (
    <React.Fragment>
      <HeaderBox>PQ Automation Test</HeaderBox>
      {nowPage.pathname === '/execution' && (
        <PageButton onClick={() => nextPage('/caseset')}>Move to caseset</PageButton>
      )}
      {nowPage.pathname === '/caseset' && (
        <PageButton onClick={() => nextPage('/execution')}>Move to execution</PageButton>
      )}
      <Outlet />
    </React.Fragment>
  );
};
