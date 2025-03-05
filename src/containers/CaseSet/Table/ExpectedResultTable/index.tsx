import React from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ExpectedResultTableBox } from './style';
import { expectedResultColumns } from './util';

import { TableHeaderBox, TableDataBox, DataTable } from '@components';
import { expectedResultsAtom, jsonBotAtom } from '@recoil/status';

export const ExpectedResultTable = () => {
  const expectedResults = useRecoilValue(expectedResultsAtom);
  const setJsonBot = useSetRecoilState(jsonBotAtom);

  return (
    <ExpectedResultTableBox>
      <TableHeaderBox>Expected result</TableHeaderBox>
      <TableDataBox>
        <DataTable
          rows={expectedResults}
          columns={expectedResultColumns}
          hideFooter
          disableColumnMenu
          columnHeaderHeight={48}
          rowHeight={48}
          onRowClick={(params) => {
            setJsonBot(JSON.parse(params.row.data.replace(/\bNaN\b/g, 'null')));
          }}
        />
      </TableDataBox>
    </ExpectedResultTableBox>
  );
};
