import React from 'react';

import { Modal } from '@mui/material';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useRecoilState, useRecoilValue } from 'recoil';

import { ErrorModalBox } from './style';

import { executionIdAtom, isErrorModalOpenAtom } from '@/recoil/status';
import { ModalDataBox, ModalHeaderBox, StopAllButton, StopButton } from '@components';

export const executionLogColumns: GridColDef[] = [
  {
    field: 'performer',
    headerName: 'Performer',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'createdAt',
    headerName: 'Created at',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    cellClassName: (params: GridCellParams) => {
      if (params.value == null) {
        return '';
      }
      return clsx('statusColor', {
        running: params.value === 'running',
        cancelled: params.value === 'cancelled',
        error: params.value === 'error',
        done: params.value === 'done',
      });
    },
  },
  {
    field: 'actions',
    flex: 0.4,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    renderHeader: () => <StopAllButton>Stop all</StopAllButton>,
    renderCell: () => <StopButton>Stop</StopButton>,
  },
];

//질문: logAxiosError에서 어떻게 못 가져오나?
export const ErrorModal = () => {
  const executionId = useRecoilValue(executionIdAtom);
  const [errorModalOpen, setErrorModalOpen] = useRecoilState(isErrorModalOpenAtom);
  const handleErrorModalClose = () => setErrorModalOpen(false);

  return (
    <Modal open={errorModalOpen} onClose={handleErrorModalClose}>
      <ErrorModalBox>
        <ModalHeaderBox>404 not found</ModalHeaderBox>
        <ModalDataBox>
          CaseLogs with execution id
          {'\n"'}
          {executionId}
          {'"\n'}
          not found
        </ModalDataBox>
      </ErrorModalBox>
    </Modal>
  );
};
