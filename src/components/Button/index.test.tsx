import React from 'react';

import { render, screen } from '@testing-library/react';

import { DecisionButton, CancelButton, RefreshButton, CreateButton } from './index';

describe('Button', () => {
  it('render', () => {
    render(<DecisionButton>DecisionButton</DecisionButton>);
    render(<CancelButton />);
    const stopCircleIcon = screen.getByTestId('StopCircleIcon');
    render(<RefreshButton />);
    const refreshIcon = screen.getByTestId('RefreshIcon');
    render(<CreateButton />);
    const createIcon = screen.getByTestId('CreateIcon');
    expect(screen.getByText('DecisionButton')).toBeInTheDocument();
    expect(stopCircleIcon).toBeInTheDocument();
    expect(refreshIcon).toBeInTheDocument();
    expect(createIcon).toBeInTheDocument();
  });
});
