import React from 'react';

import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useSetRecoilState } from 'recoil';

import { formatTimeUntilSecond } from '@/utils';
import { StopAllButton, StopButton } from '@components';
import { isStopModalOpenAtom, stopTargetAtom } from '@recoil/status';

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
    valueGetter: (params) => formatTimeUntilSecond(params.value).slice(0, 16),
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    sortable: true,
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
      const setIsStopModalOpen = useSetRecoilState(isStopModalOpenAtom);
      const setStopTarget = useSetRecoilState(stopTargetAtom);
      return (
        <StopAllButton
          onClick={() => {
            setStopTarget('');
            setIsStopModalOpen(true);
          }}
        >
          Stop all
        </StopAllButton>
      );
    },
    renderCell: function CancelExecutionById(params) {
      const setIsStopModalOpen = useSetRecoilState(isStopModalOpenAtom);
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
