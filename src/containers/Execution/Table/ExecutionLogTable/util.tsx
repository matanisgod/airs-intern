import React from 'react';

import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useSetRecoilState } from 'recoil';

import { formatTimeUntilSecond } from '@/utils';
import { useExecutionApi } from '@common/api';
import { StopAllButton, StopButton } from '@components';
import { executionLogsAtom } from '@recoil/status';

export const executionLogColumns: Array<GridColDef> = [
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
    valueGetter: (params) => formatTimeUntilSecond(params.value).slice(0, 16),
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
      const setExecutionLogsAtom = useSetRecoilState(executionLogsAtom);

      const fetchExecution = async () => {
        if (!executionApi) return;
        const response = await executionApi.cancelExecution();
        if (response) {
          setExecutionLogsAtom((prev) =>
            prev.map((row) => ({
              ...row,
              status: 'cancelled',
            })),
          );
        }
      };

      return <StopAllButton onClick={fetchExecution}>Stop all</StopAllButton>;
    },
    renderCell: function CancelExecutionById(params) {
      const executionApi = useExecutionApi();
      const setExecutionLogsAtom = useSetRecoilState(executionLogsAtom);

      const fetchExecutionById = async (params) => {
        if (!executionApi) return;
        const response = await executionApi.cancelExecutionById(params.row.id);
        if (response) {
          setExecutionLogsAtom((prev) =>
            prev.map((row) =>
              row.id === params.row.id
                ? {
                    ...row,
                    status: 'cancelled',
                  }
                : row,
            ),
          );
          console.log('ok');
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
