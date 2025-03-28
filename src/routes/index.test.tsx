import React from 'react';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './index';

jest.mock('@containers', () => ({
  Header: () => <div>Header</div>,
}));

jest.mock('@routes/pages/ExecutionPage', () => ({
  ExecutionPage: () => <div>Execution</div>,
}));

jest.mock('@routes/pages/CaseSetPage', () => ({
  CaseSetPage: () => <div>CaseSet</div>,
}));

describe('AppRoutes', () => {
  it('redirect', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Execution')).toBeInTheDocument();
  });

  it('Execution', () => {
    render(
      <MemoryRouter initialEntries={['/execution']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Execution')).toBeInTheDocument();
  });
  it('CaseSet', () => {
    render(
      <MemoryRouter initialEntries={['/caseset']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('CaseSet')).toBeInTheDocument();
  });
});
