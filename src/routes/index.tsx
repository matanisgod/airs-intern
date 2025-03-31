import React, { useMemo } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import { CaseSetPage, ExecutionPage } from './pages';

import { Header } from '@containers';

const AppRoutes = () => {
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
  return renderRoutes;
};

export default AppRoutes;
