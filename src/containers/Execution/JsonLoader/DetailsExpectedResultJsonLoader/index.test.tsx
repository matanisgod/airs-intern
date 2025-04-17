import React from 'react';

import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { DetailsExpectedResultJsonLoader } from './index';

import { actualResultJsonAtom } from '@recoil';

describe('DetailsExpectedResultJsonLoader', () => {
  const renderComponent = (initialValue: object) =>
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(actualResultJsonAtom, initialValue);
        }}
      >
        <DetailsExpectedResultJsonLoader />
      </RecoilRoot>,
    );

  it('render isEmpty', () => {
    renderComponent({});
    expect(screen.getByText('Expected result data')).toBeInTheDocument();
    expect(screen.getByText('Select detail')).toBeInTheDocument();
  });

  // it('render !isEmpty', () => {
  //   const mockData = { a: 'b' };

  //   renderComponent(mockData);
  //   expect(screen.getByText('Expected result data')).toBeInTheDocument();
  //   expect(screen.getByText('a')).toBeInTheDocument();
  // });
});
