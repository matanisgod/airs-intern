import React from 'react';

import { CaseLogTableBox } from '../style';
// import { caseLogColumns } from '../util';

import { TableHeaderBox, TableDataBox } from '@/components';

export const CaseLogTable = () => {
  // const caseLogRows = useRecoilValue;
  return (
    <CaseLogTableBox>
      <TableHeaderBox>Case log</TableHeaderBox>
      <TableDataBox>
        {/* <DataTable
          rows={caseLogRows}
          columns={caseLogColumns}
          hideFooter
          disableColumnMenu
          columnHeaderHeight={48}
          rowHeight={48}
          // onRowClick={(params) => {}}
        /> */}
      </TableDataBox>
    </CaseLogTableBox>
  );
};
