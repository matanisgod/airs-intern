import React from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { DetailsTableBox } from './style';
import { detailColumns } from './util';

import {
  actualResultJsonAtom,
  detailsAtom,
  detailsExpectedResultJsonAtom,
} from '@/recoil/status';
import { TableHeaderBox, TableDataBox, DataTable } from '@components';

//TODO: result log 예쁘게 보이도록 하기
export const DetailsTable = () => {
  const details = useRecoilValue(detailsAtom);
  const setActualResultJson = useSetRecoilState(actualResultJsonAtom);
  const setDetailsExpectedResultJson = useSetRecoilState(detailsExpectedResultJsonAtom);
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
          localeText={{
            noRowsLabel: 'Select case log',
          }}
        />
      </TableDataBox>
    </DetailsTableBox>
  );
};
