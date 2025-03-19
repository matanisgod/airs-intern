import React, { useMemo } from 'react';

import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { CaseSetPage, ExecutionPage } from './pages';

import { themeSelector } from '@/theme';
import { Header } from '@containers';
import { RecoilHooks } from '@recoil/hooks';

const AppRoutes = () => {
  const darkTheme = createTheme(themeSelector());

  const renderRoutes = useMemo(() => {
    return (
      <Routes>
        <Route element={<Header />}>
          <Route index element={<Navigate to="/execution" replace />} />
          <Route path="execution" element={<ExecutionPage />} />
          <Route path="caseset" element={<CaseSetPage />} />
        </Route>
      </Routes>
    );
  }, []);
  return (
    <RecoilHooks>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <BrowserRouter>{renderRoutes}</BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </RecoilHooks>
  );
};

export default AppRoutes;
