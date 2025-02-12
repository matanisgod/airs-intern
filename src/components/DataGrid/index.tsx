import * as React from 'react';

import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

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
    editable: true,
  },
];

//TODO: getCaseSet data를 rows에
const rows = [];

export default function DataTable() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
