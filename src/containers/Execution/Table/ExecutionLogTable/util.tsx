import React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useSetRecoilState } from 'recoil';

import { StopButton } from './style';

import { dichotomyAtom, stopTargetAtom } from '@recoil';
import { formatTimeUntilSecond } from '@utils';

export const executionLogColumns: Array<GridColDef> = [
  {
    field: 'performer',
    headerName: 'Performer',
    flex: 1,
    sortable: true,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'createdAt',
    headerName: 'Created at',
    flex: 1,
    sortable: true,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params) => formatTimeUntilSecond(params.value),
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    sortable: true,
    headerAlign: 'center',
    align: 'center',
    cellClassName: (params) => {
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
    headerName: 'Action',
    flex: 0.4,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: function CancelExecutionById(params) {
      const setIsStopModalOpen = useSetRecoilState(dichotomyAtom('isStopModalOpen'));
      const setStopTarget = useSetRecoilState(stopTargetAtom);

      return (
        <StopButton
          onClick={(event) => {
            event.stopPropagation();
            setStopTarget(params.row.id);
            setIsStopModalOpen(true);
          }}
        >
          Stop
        </StopButton>
      );
    },
  },
];
