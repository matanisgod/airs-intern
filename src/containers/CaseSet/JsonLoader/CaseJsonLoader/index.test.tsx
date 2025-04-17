import React from 'react';

import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { CaseJsonLoader } from './index';

import { caseJsonAtom } from '@recoil';

describe('CaseJsonLoader', () => {
  const renderComponent = (initialValue: object) =>
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(caseJsonAtom, initialValue);
        }}
      >
        <CaseJsonLoader />
      </RecoilRoot>,
    );

  it('render isEmpty', () => {
    renderComponent({});
    expect(screen.getByText('Case data')).toBeInTheDocument();
    expect(screen.getByText('Select case')).toBeInTheDocument();
  });

  it('render !isEmpty', () => {
    const mockData = { a: 'b' };

    renderComponent(mockData);
    expect(screen.getByText('Case data')).toBeInTheDocument();
    expect(screen.getByText('a')).toBeInTheDocument();
  });
});
