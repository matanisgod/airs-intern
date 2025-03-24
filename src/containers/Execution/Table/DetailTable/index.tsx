import React from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { DetailsTableBox } from './style';
import { detailColumns } from './util';

import { TableDataBox, DataTable, DatagridDefaultBox } from '@components';
import {
  actualResultJsonAtom,
  detailsAtom,
  detailsExpectedResultJsonAtom,
} from '@recoil/status';

export const DetailsTable = () => {
  const details = useRecoilValue(detailsAtom);

  const setActualResultJson = useSetRecoilState(actualResultJsonAtom);
  const setDetailsExpectedResultJson = useSetRecoilState(detailsExpectedResultJsonAtom);

  const DatagridOverlay = () => <DatagridDefaultBox>Select case log</DatagridDefaultBox>;

  return (
    <DetailsTableBox>
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
          scrollbarSize={0}
        />
      </TableDataBox>
    </DetailsTableBox>
  );
};
