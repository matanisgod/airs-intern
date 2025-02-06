import React, { useMemo } from 'react';

import {
  Box,
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import _ from 'lodash';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import ExecutionPage from './pages/ExecutionPage';
import CaseSetPage from './pages/CaseSetPage';

import { themeSelector } from '@/theme';
import { RecoilHooks } from '@recoil/hooks';
import { currentThemeAtom } from '@recoil/status';
import { HeaderBox } from '@/components/Header';

const AppRoutes: React.FC = () => {
  const currentTheme = useRecoilValue(currentThemeAtom);

  const themeMode = useMemo(
    () => createTheme(themeSelector(currentTheme)),
    [currentTheme],
  );

  const renderRoutes = useMemo(() => {
    return (
      <Routes>
        <Route>
          <Route index element={<Navigate to="/execution" replace />} />
          <Route path="caseset" element={<CaseSetPage />} />
          <Route path="execution" element={<ExecutionPage />} />
        </Route>
      </Routes>
    );
  }, []);
  const Header: React.FC = () => {
    return <HeaderBox>PQ Automation Test</HeaderBox>;
  };
  return (
    <RecoilHooks>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themeMode}>
          <CssBaseline />
          <BrowserRouter>
            <Header />
            {renderRoutes}
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </RecoilHooks>
  );
};

export default AppRoutes;
