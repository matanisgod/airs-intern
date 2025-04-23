import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import * as recoil from 'recoil';

import { ErrorModal } from './index';

import { dichotomyAtom } from '@recoil';

describe('ErrorModal', () => {
  const mockSetErrorModalOpen = jest.fn();
  const mockSetErrorMessage = jest.fn();

  it('unknown error', () => {
    jest.spyOn(recoil, 'useRecoilState').mockImplementation((atom) => {
      if (atom === dichotomyAtom('isErrorModalOpen')) {
        return [true, mockSetErrorModalOpen];
      }
      if (atom.key === 'errorMessageAtom') {
        return [{ status: undefined, statusText: '' }, mockSetErrorMessage];
      }
      return [null, jest.fn()];
    });
    render(
      <RecoilRoot>
        <ErrorModal />
      </RecoilRoot>,
    );

    expect(screen.getByText('Unknown error')).toBeInTheDocument();
  });

  it('404 error', () => {
    jest.spyOn(recoil, 'useRecoilState').mockImplementation((atom) => {
      if (atom === dichotomyAtom('isErrorModalOpen')) {
        return [true, mockSetErrorModalOpen];
      }
      if (atom.key === 'errorMessageAtom') {
        return [{ status: 404, statusText: 'Not Found' }, mockSetErrorMessage];
      }
      return [null, jest.fn()];
    });
    render(
      <RecoilRoot>
        <ErrorModal />
      </RecoilRoot>,
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });

  it('onClick', () => {
    jest.spyOn(recoil, 'useRecoilState').mockImplementation((atom) => {
      if (atom === dichotomyAtom('isErrorModalOpen')) {
        return [true, mockSetErrorModalOpen];
      }
      if (atom.key === 'errorMessageAtom') {
        return [{ status: 404, statusText: 'Not Found' }, mockSetErrorMessage];
      }
      return [null, jest.fn()];
    });
    render(
      <RecoilRoot>
        <ErrorModal />
      </RecoilRoot>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetErrorMessage).toHaveBeenCalledWith({
      status: undefined,
      statusText: '',
    });
    expect(mockSetErrorModalOpen).toHaveBeenCalledWith(false);
  });
});
