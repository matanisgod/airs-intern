import React from 'react';

import { useRecoilValue } from 'recoil';

import { CaseLogTableBox } from './style';
import { caseLogColumns } from './util';

import { TableHeaderBox, TableDataBox, DataTable } from '@components';
import { caseLogsAtom } from '@recoil/status';

export const CaseLogTable = () => {
  const caseLogs = useRecoilValue(caseLogsAtom);
  return (
    <CaseLogTableBox>
      <TableHeaderBox>Case log</TableHeaderBox>
      <TableDataBox>
        <DataTable
          rows={caseLogs}
          columns={caseLogColumns}
          hideFooter
          disableColumnMenu
          columnHeaderHeight={48}
          rowHeight={48}
          // onRowClick={(params) => {}}
        />
      </TableDataBox>
    </CaseLogTableBox>
  );
};
