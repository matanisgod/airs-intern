import React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ExpectedResultTableBox } from '../style';

import { TableHeaderBox, TableDataBox, DataTable } from '@/components';
import { expectedResultAtom, jsonBotAtom } from '@/recoil/status';

const expectedResultColumns: GridColDef[] = [
  {
    field: 'version',
    headerName: 'Version',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
];

export const ExpectedResultTable = () => {
  const expectedResult = useRecoilValue(expectedResultAtom);
  const setJsonBotData = useSetRecoilState(jsonBotAtom);
  const expectedResultRows = expectedResult.data.map((item) => ({
    id: item.id,
    version: item.version,
    data: item.data,
  }));
  return (
    <ExpectedResultTableBox>
      <TableHeaderBox>Expected result</TableHeaderBox>
      <TableDataBox>
        <DataTable
          rows={expectedResultRows}
          columns={expectedResultColumns}
          hideFooter
          disableColumnMenu
          columnHeaderHeight={48}
          rowHeight={48}
          onRowClick={(params) => {
            setJsonBotData(JSON.parse(params.row.data.replace(/\bNaN\b/g, 'null')));
          }}
        />
      </TableDataBox>
    </ExpectedResultTableBox>
  );
};
