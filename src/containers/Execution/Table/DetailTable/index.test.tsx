import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import * as recoil from 'recoil';

import { DetailsTable } from './index';

import { detailsAtom, idAtom, Detail } from '@recoil';

jest.mock('@utils', () => ({
  logAxiosError: jest.fn(),
  useErrorSetter: jest.fn(),
}));

describe('DetailsTable', () => {
  const mockSetActualResultJson = jest.fn();
  const mockSetDetailsExpectedResultJson = jest.fn();
  const mockResetDetailId = jest.fn();
  const mockResetActualResultJson = jest.fn();
  const mockResetDetailsExpectedResultJson = jest.fn();

  const mockDetail: Detail = {
    result: 'true',
    resultLog: 'log',
    actualResult: '{"result": "true"}',
    expectedResult: { data: '{"resultLog": "log"}' },
    checkType: 'pacs',
    id: 'detailId',
  };

  const mockDetails = [mockDetail];

  beforeEach(() => {
    jest.spyOn(recoil, 'useSetRecoilState').mockImplementation((atom) => {
      if (atom.key === 'actualResultJsonAtom') {
        return mockSetActualResultJson;
      }
      if (atom.key === 'detailsExpectedResultJsonAtom') {
        return mockSetDetailsExpectedResultJson;
      }
      return jest.fn();
    });

    jest.spyOn(recoil, 'useResetRecoilState').mockImplementation((atom) => {
      if (atom.key === 'actualResultJsonAtom') {
        return mockResetActualResultJson;
      }
      if (atom.key === 'detailsExpectedResultJsonAtom') {
        return mockResetDetailsExpectedResultJson;
      }
      if (atom === idAtom('detailId')) {
        return mockResetDetailId;
      }
      return jest.fn();
    });

    jest.spyOn(recoil, 'useRecoilValue').mockImplementation((atom) => {
      if (atom.key === 'detailsAtom') {
        return mockDetails;
      }
      return null;
    });
  });

  const renderComponent = (initialValue: string = '') =>
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(detailsAtom, mockDetails);
          if (initialValue !== '') {
            set(idAtom('detailId'), initialValue);
          }
        }}
      >
        <DetailsTable />
      </RecoilRoot>,
    );

  it('DataTable', () => {
    renderComponent();
    expect(screen.getByText('pacs')).toBeInTheDocument();
  });

  it('onRowClick', async () => {
    renderComponent();

    fireEvent.click(screen.getByText('pacs'));

    await waitFor(() => {
      expect(mockSetActualResultJson).toHaveBeenCalledWith({ result: 'true' });
      expect(mockSetDetailsExpectedResultJson).toHaveBeenCalledWith({ resultLog: 'log' });
    });
  });

  it('detailId === params.row.id && event.ctrlKey', async () => {
    renderComponent('detailId');

    fireEvent.click(screen.getByText('pacs'), { ctrlKey: true });

    await waitFor(() => {
      expect(mockResetActualResultJson).toHaveBeenCalled();
      expect(mockResetDetailsExpectedResultJson).toHaveBeenCalled();
      expect(mockResetDetailId).toHaveBeenCalled();
    });
  });

  it('detailId === params.row.id && !event.ctrlKey', async () => {
    renderComponent('detailId');

    fireEvent.click(screen.getByText('pacs'), { ctrlKey: false });

    await waitFor(() => {
      expect(mockSetActualResultJson).not.toHaveBeenCalled();
      expect(mockSetDetailsExpectedResultJson).not.toHaveBeenCalled();
    });
  });
});
