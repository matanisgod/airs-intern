import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { ErrorFallback } from './index';

describe('ErrorFallback', () => {
  const mockError = new Error('error');
  mockError.stack = 'stack';
  const mockReset = jest.fn();

  beforeEach(() => {
    render(<ErrorFallback error={mockError} resetErrorBoundary={mockReset} />);
  });

  it('render', () => {
    expect(screen.getByText('Something went wrong:')).toBeInTheDocument();
    expect(screen.getByText('error')).toBeInTheDocument();
    expect(screen.getByText('stack')).toBeInTheDocument();
  });

  it('button', () => {
    fireEvent.click(screen.getByText('Try again'));
    expect(mockReset).toHaveBeenCalled();
  });
});
