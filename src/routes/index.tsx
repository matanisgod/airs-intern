import React, { useMemo } from 'react';

import {
    createTheme,
    CssBaseline,
    StyledEngineProvider,
    ThemeProvider,
} from '@mui/material';
import _ from 'lodash';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import ExamplePage from './pages/ExamplePage';
import Login from './pages/Login';
import { ProtectedRoute } from './protectedRouter';

import { themeSelector } from '@/theme';
import { RecoilHooks } from '@recoil/hooks';
import { currentThemeAtom } from '@recoil/status';

const AppRoutes: React.FC = () => {
    const currentTheme = useRecoilValue(currentThemeAtom);

    const themeMode = useMemo(
        () => createTheme(themeSelector(currentTheme)),
        [currentTheme],
    );

    const renderRoutes = useMemo(() => {
        return (
            <Routes>
                <Route index element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="example" element={<ExamplePage />} />
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
