import React from 'react';

import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { CaseExpectedResultJsonLoader } from './index';

import { caseExpectedResultJsonAtom } from '@recoil';

describe('CaseExpectedResultJsonLoader', () => {
  const renderComponent = (initialValue: object) =>
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(caseExpectedResultJsonAtom, initialValue);
        }}
      >
        <CaseExpectedResultJsonLoader />
      </RecoilRoot>,
    );

  it('render isEmpty', () => {
    renderComponent({});
    expect(screen.getByText('Expected result data')).toBeInTheDocument();
    expect(screen.getByText('Select expected result')).toBeInTheDocument();
  });

  it('render !isEmpty', () => {
    const mockData = { a: 'b' };

    renderComponent(mockData);
    expect(screen.getByText('Expected result data')).toBeInTheDocument();
    expect(screen.getByText('a')).toBeInTheDocument();
  });
});
