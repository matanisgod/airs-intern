import React from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { DetailsTableBox } from './style';
import { detailColumns } from './util';

import {
  actualResultJsonAtom,
  detailsAtom,
  detailsExpectedResultJsonAtom,
} from '@/recoil/status';
import { TableHeaderBox, TableDataBox, DataTable, DatagridDefaultBox } from '@components';

export const DetailsTable = () => {
  const details = useRecoilValue(detailsAtom);

  const setActualResultJson = useSetRecoilState(actualResultJsonAtom);
  const setDetailsExpectedResultJson = useSetRecoilState(detailsExpectedResultJsonAtom);

  const DatagridOverlay = () => <DatagridDefaultBox>Select case log</DatagridDefaultBox>;

  return (
    <DetailsTableBox>
      <TableHeaderBox>Detail</TableHeaderBox>
      <TableDataBox>
        <DataTable
          rows={details}
          columns={detailColumns}
          hideFooter
          disableColumnMenu
          columnHeaderHeight={48}
          rowHeight={48}
          onRowClick={(params) => {
            setActualResultJson(
              JSON.parse(params.row.actualResult.replace(/\bNaN\b/g, 'null')),
            );
            setDetailsExpectedResultJson(
              JSON.parse(params.row.expectedResult.data.replace(/\bNaN\b/g, 'null')),
            );
          }}
          slots={{
            noRowsOverlay: DatagridOverlay,
          }}
        />
      </TableDataBox>
    </DetailsTableBox>
  );
};
