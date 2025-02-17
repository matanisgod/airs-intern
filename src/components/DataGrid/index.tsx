import * as React from 'react';

import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRecoilValue } from 'recoil';

import { caseSetAtom } from '@/recoil/status';

export default function DataTable() {
  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'title',
      headerName: 'Title',
      width: 90,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
    },
  ];
  //TODO: 빨간 줄 없애기 근데 왜 생김???
  const caseSet = useRecoilValue(caseSetAtom);
  const rows = caseSet.map((item, index) => ({
    id: index + 1,
    type: item.type,
    title: item.title,
  }));
  return (
    <Box sx={{ height: 800, width: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
