import React from 'react';

import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { ActualResultJsonLoader } from './index';

import { actualResultJsonAtom } from '@recoil';

describe('ActualResultJsonLoader', () => {
  const renderComponent = (initialValue: object) =>
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(actualResultJsonAtom, initialValue);
        }}
      >
        <ActualResultJsonLoader />
      </RecoilRoot>,
    );

  it('render isEmpty', () => {
    renderComponent({});
    expect(screen.getByText('Actual result data')).toBeInTheDocument();
    expect(screen.getByText('Select detail')).toBeInTheDocument();
  });

  it('render !isEmpty', () => {
    const mockData = { a: 'b' };

    renderComponent(mockData);
    expect(screen.getByText('Actual result data')).toBeInTheDocument();
    expect(screen.getByText('a')).toBeInTheDocument();
  });
});
