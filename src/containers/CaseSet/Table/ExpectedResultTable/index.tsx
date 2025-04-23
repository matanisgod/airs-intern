import React from 'react';

import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import { ExpectedResultTableBox } from './style';
import { expectedResultColumns } from './util';

import { TableHeaderBox, TableDataBox, DataTable, DatagridDefaultBox } from '@components';
import { expectedResultsAtom, caseExpectedResultJsonAtom, idAtom } from '@recoil';

export const ExpectedResultTable = () => {
  const [expectedResultId, setExpectedResultId] = useRecoilState(
    idAtom('expectedResultId'),
  );

  const expectedResults = useRecoilValue(expectedResultsAtom);

  const setCaseExpectedResultJson = useSetRecoilState(caseExpectedResultJsonAtom);

  const resetCaseExpectedResultJson = useResetRecoilState(caseExpectedResultJsonAtom);
  const resetExpectedResultsId = useResetRecoilState(idAtom('expectedResultId'));

  const DatagridOverlay = () => <DatagridDefaultBox>Select case</DatagridDefaultBox>;

  return (
    <ExpectedResultTableBox>
      <TableHeaderBox>Expected result</TableHeaderBox>
      <TableDataBox>
        <DataTable
          rows={expectedResults}
          columns={expectedResultColumns}
          hideFooter
          disableColumnMenu
          columnHeaderHeight={40}
          rowHeight={40}
          onRowClick={(params, event) => {
            if (expectedResultId === params.row.id && event.ctrlKey) {
              resetCaseExpectedResultJson();
              resetExpectedResultsId();
            } else if (expectedResultId === params.row.id && !event.ctrlKey) {
              return;
            } else {
              setCaseExpectedResultJson(
                JSON.parse(params.row.data.replace(/\bNaN\b/g, 'null')),
              );
              setExpectedResultId(params.row.id);
            }
          }}
          slots={{
            noRowsOverlay: DatagridOverlay,
          }}
          disableMultipleRowSelection={true}
          disableColumnReorder={true}
          scrollbarSize={8}
        />
      </TableDataBox>
    </ExpectedResultTableBox>
  );
};
