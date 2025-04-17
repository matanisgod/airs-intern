import React, { PropsWithChildren } from 'react';

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

jest.mock('@components', () => {
  const actual = jest.requireActual('@mui/material');
  return {
    ...actual,
    CreateDialog: ({
      children,
    }: PropsWithChildren<{ open: boolean; onClose: () => void }>) => (
      <div>{children}</div>
    ),
    CreateDialogTitle: ({ children }: PropsWithChildren<unknown>) => (
      <div>{children}</div>
    ),
    CreateDialogContent: ({ children }: PropsWithChildren<unknown>) => (
      <div>{children}</div>
    ),
    StyledForm: ({
      children,
      ...props
    }: PropsWithChildren<React.FormHTMLAttributes<HTMLFormElement>>) => (
      <form {...props}>{children}</form>
    ),
    CreateDialogContentText: ({ children }: PropsWithChildren<unknown>) => (
      <p>{children}</p>
    ),
    CreateDialogFormControl: ({ children }: PropsWithChildren<unknown>) => (
      <div>{children}</div>
    ),

    CreateDialogCheckbox: actual.Checkbox,
    CreateDialogMenuItem: actual.MenuItem,
    MenuProps: {},
  };
});

jest.mock('./style', () => ({
  ExecutionDecisionButton: ({
    children,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{children}</button>
  ),
}));

describe('CreateExecutionDialog', () => {
  const mockSetExecutionLogs = jest.fn();
  const mockSetIsOpen = jest.fn();
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
  ];

  beforeEach(() => {
    (useRecoilState as jest.Mock).mockReturnValue([true, mockSetIsOpen]);
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
    fireEvent.click(within(listbox).getByText('title1'));
    fireEvent.click(within(listbox).getByText('title2'));

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
      expect(screen.getByText('title1, title2')).toBeInTheDocument();
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
      expect(mockSetIsOpen).toHaveBeenCalledWith(false);
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
      expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    });
  });
});
