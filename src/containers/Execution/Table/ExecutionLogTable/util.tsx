import React from 'react';

import { GridColDef } from '@mui/x-data-grid';

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
    field: 'actions',
    flex: 0.4,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    renderHeader: () => <StopAllButton>Stop all</StopAllButton>,
    renderCell: () => <StopButton>Stop</StopButton>,
  },
];
