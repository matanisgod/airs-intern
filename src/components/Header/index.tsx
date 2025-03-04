import React from 'react';

import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import { HeaderBox, PageButton } from './style';

export const Header = () => {
  const nextPage = useNavigate();
  const currentPage = useLocation();
  return (
    <React.Fragment>
      <HeaderBox>PQ Automation Test</HeaderBox>
      {currentPage.pathname === '/execution' && (
        <PageButton onClick={() => nextPage('/caseset')}>Move to caseset</PageButton>
      )}
      {currentPage.pathname === '/caseset' && (
        <PageButton onClick={() => nextPage('/execution')}>Move to execution</PageButton>
      )}
      <Outlet />
    </React.Fragment>
  );
};
