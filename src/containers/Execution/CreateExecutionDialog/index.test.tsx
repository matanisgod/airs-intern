import React from 'react';

import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { CreateExecutionDialog, ExecutionForm } from './index';

import { useExecutionApi } from '@common/api';
import type { CaseSets } from '@recoil';

jest.mock('recoil', () => ({
  ...jest.requireActual('recoil'),
  useRecoilState: jest.fn(),
  useSetRecoilState: jest.fn(),
  useRecoilValue: jest.fn(),
}));

jest.mock('@common/api', () => ({
  useExecutionApi: jest.fn(),
}));

describe('CreateExecutionDialog', () => {
  const mockSetExecutionLogs = jest.fn();
  const mockSetOpen = jest.fn();
  const executionForm: ExecutionForm = {
    testSets: [],
    version: '',
    description: '',
    testPerformer: '',
    gatePcIp: '',
    dcsApiPort: undefined,
    dcsDicomPort: undefined,
    hospitalRealm: '',
    keycloakUrl: '',
    keycloakLoginId: '',
    keycloakLoginPw: '',
  };
  const caseSets: CaseSets = [
    {
      id: 'id0',
      type: 'type0',
      title: 'title0',
      cases: [],
    },
    {
      id: 'id1',
      type: 'type1',
      title: 'title1',
      cases: [],
    },
    {
      id: 'id2',
      type: 'type2',
      title: 'title2',
      cases: [],
    },
    {
      id: 'id3',
      type: 'type3',
      title: 'title3',
      cases: [],
    },
  ];

  beforeEach(() => {
    (useRecoilState as jest.Mock).mockReturnValue([true, mockSetOpen]);
    (useSetRecoilState as jest.Mock).mockReturnValue(mockSetExecutionLogs);
    (useRecoilValue as jest.Mock).mockReturnValue(caseSets);
    (useExecutionApi as jest.Mock).mockReturnValue({
      createExecution: jest.fn().mockResolvedValue(executionForm),
      getExecutionLogs: jest.fn().mockResolvedValue([]),
    });
  });

  it('render & submit', async () => {
    render(
      <RecoilRoot>
        <CreateExecutionDialog />
      </RecoilRoot>,
    );

    expect(screen.getByText('Create execution')).toBeInTheDocument();

    const textInputs = screen.getAllByRole('textbox');
    const numberInputs = screen.getAllByRole('spinbutton');

    fireEvent.mouseDown(screen.getByRole('combobox'));
    const listbox = await screen.findByRole('listbox');
    fireEvent.click(within(listbox).getByText('title0'));
    fireEvent.click(within(listbox).getByText('title1'));
    fireEvent.click(within(listbox).getByText('title2'));
    fireEvent.click(within(listbox).getByText('title3'));

    fireEvent.change(textInputs[0], { target: { value: 'ver' } });
    fireEvent.change(textInputs[1], { target: { value: 'desc' } });
    fireEvent.change(textInputs[2], { target: { value: 'junha' } });
    fireEvent.change(textInputs[3], { target: { value: '1.1.1.1' } });
    fireEvent.change(textInputs[4], { target: { value: 'realm' } });
    fireEvent.change(textInputs[5], { target: { value: 'https://example.com' } });
    fireEvent.change(textInputs[6], { target: { value: 'id' } });
    fireEvent.change(textInputs[7], { target: { value: 'pw' } });

    fireEvent.change(numberInputs[0], { target: { value: 5555 } });
    fireEvent.change(numberInputs[1], { target: { value: 6666 } });

    await waitFor(() => {
      expect(screen.getByText('title0, title1, ...')).toBeInTheDocument();
      expect(textInputs[0]).toHaveValue('ver');
      expect(textInputs[1]).toHaveValue('desc');
      expect(textInputs[2]).toHaveValue('junha');
      expect(textInputs[3]).toHaveValue('1.1.1.1');
      expect(textInputs[4]).toHaveValue('realm');
      expect(textInputs[5]).toHaveValue('https://example.com');
      expect(textInputs[6]).toHaveValue('id');
      expect(textInputs[7]).toHaveValue('pw');
      expect(numberInputs[0]).toHaveValue(5555);
      expect(numberInputs[1]).toHaveValue(6666);
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockSetExecutionLogs).toHaveBeenCalledWith([]);
      expect(mockSetOpen).toHaveBeenCalledWith(false);
    });
  });
  it('close dialog', async () => {
    render(
      <RecoilRoot>
        <CreateExecutionDialog />
      </RecoilRoot>,
    );
    fireEvent.click(screen.getByText('Cancel'));

    await waitFor(() => {
      expect(mockSetOpen).toHaveBeenCalledWith(false);
    });
  });

  it('validate', async () => {
    render(
      <RecoilRoot>
        <CreateExecutionDialog />
      </RecoilRoot>,
    );

    expect(screen.getByText('Create execution')).toBeInTheDocument();

    const textInputs = screen.getAllByRole('textbox');
    const numberInputs = screen.getAllByRole('spinbutton');

    fireEvent.change(textInputs[0], { target: { value: 'ver' } });
    fireEvent.change(textInputs[1], { target: { value: 'desc' } });
    fireEvent.change(textInputs[2], { target: { value: 'junha' } });
    fireEvent.change(textInputs[3], { target: { value: '1111' } });
    fireEvent.change(textInputs[4], { target: { value: 'realm' } });
    fireEvent.change(textInputs[5], { target: { value: 'examplecom' } });
    fireEvent.change(textInputs[6], { target: { value: 'id' } });
    fireEvent.change(textInputs[7], { target: { value: 'pw' } });

    fireEvent.change(numberInputs[0], { target: { value: 5555 } });
    fireEvent.change(numberInputs[1], { target: { value: 99999 } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Field required')).toBeInTheDocument();
      expect(screen.getByText('Invalid IP address')).toBeInTheDocument();
      expect(screen.getByText('Port must be 1~65535')).toBeInTheDocument();
      expect(screen.getByText('Invalid URL')).toBeInTheDocument();
    });
  });
});
