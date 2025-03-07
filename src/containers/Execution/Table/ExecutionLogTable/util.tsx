import React from 'react';

import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useSetRecoilState } from 'recoil';

import { useExecutionApi } from '@/common/api';
import { isErrorModalOpenAtom } from '@/recoil/status';
import { StopAllButton, StopButton } from '@components';

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
    renderHeader: function CancelExecution() {
      const executionApi = useExecutionApi();
      const setErrorModalOpen = useSetRecoilState(isErrorModalOpenAtom);

      const fetchExecution = async () => {
        if (!executionApi) return;
        const response = await executionApi.cancelExecution();
        if (response) {
          console.log(response);
        } else {
          setErrorModalOpen(true);
        }
      };

      return <StopAllButton onClick={fetchExecution}>Stop all</StopAllButton>;
    },
    renderCell: function CancelExecutionById(params) {
      const executionApi = useExecutionApi();
      const setErrorModalOpen = useSetRecoilState(isErrorModalOpenAtom);

      const fetchExecutionById = async (params) => {
        if (!executionApi) return;
        const response = await executionApi.cancelExecutionById(params.row.id);
        if (response) {
          console.log(response);
        } else {
          setErrorModalOpen(true);
        }
      };

      return (
        <StopButton
          onClick={(event) => {
            event.stopPropagation();
            fetchExecutionById(params);
          }}
        >
          Stop
        </StopButton>
      );
    },
  },
];
