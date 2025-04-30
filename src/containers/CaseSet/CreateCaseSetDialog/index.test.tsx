import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';

import { CreateCaseSetDialog } from './index';

import { useCaseSetApi } from '@common/api';
import type { CaseSet } from '@recoil';

jest.mock('recoil', () => ({
  ...jest.requireActual('recoil'),
  useRecoilState: jest.fn(),
  useSetRecoilState: jest.fn(),
}));
jest.mock('@common/api', () => ({
  useCaseSetApi: jest.fn(),
}));

describe('CreateCaseSetDialog', () => {
  const mockSetCaseSets = jest.fn();
  const mockSetOpen = jest.fn();

  const caseSet: CaseSet = {
    id: 'id',
    type: 'type',
    title: 'title',
    cases: [],
  };

  beforeEach(() => {
    (useRecoilState as jest.Mock).mockReturnValue([true, mockSetOpen]);
    (useSetRecoilState as jest.Mock).mockReturnValue(mockSetCaseSets);
    (useCaseSetApi as jest.Mock).mockReturnValue({
      importCaseSet: jest.fn().mockResolvedValue(caseSet),
      getCaseSets: jest.fn().mockResolvedValue([caseSet]),
    });
  });

  it('render & upload file & submit', async () => {
    render(
      <RecoilRoot>
        <CreateCaseSetDialog />
      </RecoilRoot>,
    );

    const file1 = new File(['a: b'], 'x.yml', { type: 'application/x-yaml' });
    const file2 = new File(['c: d'], 'y.yaml', { type: 'application/x-yaml' });

    expect(screen.getByText('Create case set')).toBeInTheDocument();

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'type' } });
    fireEvent.change(inputs[1], { target: { value: 'title' } });

    const caseFile = document.getElementById('caseYamlFile') as HTMLInputElement;
    const expectedResultFile = document.getElementById(
      'expectedResultYamlFile',
    ) as HTMLInputElement;

    fireEvent.change(caseFile, { target: { files: [file1] } });
    fireEvent.change(expectedResultFile, { target: { files: [file2] } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(inputs[0]).toHaveValue('type');
      expect(inputs[1]).toHaveValue('title');
      expect(mockSetCaseSets).toHaveBeenCalledWith([caseSet]);
      expect(mockSetOpen).toHaveBeenCalledWith(false);
    });
  });

  it('validate file type', async () => {
    const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <RecoilRoot>
        <CreateCaseSetDialog />
      </RecoilRoot>,
    );

    const file = new File(['invalid'], 'invalid.txt', { type: 'text/plain' });

    const caseFile = document.getElementById('caseYamlFile') as HTMLInputElement;
    fireEvent.change(caseFile, { target: { files: [file] } });

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith('Only .yml or .yaml files are allowed.');
    });
  });

  it('close dialog', async () => {
    render(
      <RecoilRoot>
        <CreateCaseSetDialog />
      </RecoilRoot>,
    );

    fireEvent.click(screen.getByText('Cancel'));

    await waitFor(() => {
      expect(mockSetOpen).toHaveBeenCalledWith(false);
    });
  });
});
