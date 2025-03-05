import React, { useMemo } from 'react';

import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { CaseSetPage, ExecutionPage } from './pages';

import { themeSelector } from '@/theme';
import { Header } from '@components';
import { RecoilHooks } from '@recoil/hooks';
import { currentThemeAtom } from '@recoil/status';

const AppRoutes = () => {
  const currentTheme = useRecoilValue(currentThemeAtom);
  const themeMode = useMemo(
    () => createTheme(themeSelector(currentTheme)),
    [currentTheme],
  );
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
        <ThemeProvider theme={themeMode}>
          <CssBaseline />
          <BrowserRouter>{renderRoutes}</BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </RecoilHooks>
  );
};

export default AppRoutes;
