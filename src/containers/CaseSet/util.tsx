import React from 'react';

import { GridColDef } from '@mui/x-data-grid';

import { StopButton, StopAllButton } from '@/components';

export const caseSetColumns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Title',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  //TODO: Stop 버튼 Execution에서만 써야 함
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 0.4,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    renderHeader: () => <StopAllButton>Stop all</StopAllButton>,
    renderCell: () => <StopButton>Stop</StopButton>,
  },
];

export const casecolumns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'Cases',
    headerName: 'ID',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
];
