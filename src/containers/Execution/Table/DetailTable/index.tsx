import React from 'react';

import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import { DetailsTableBox } from './style';
import { detailColumns } from './util';

import { DataTable } from '@components';
import {
  actualResultJsonAtom,
  detailsAtom,
  detailsExpectedResultJsonAtom,
  idAtom,
} from '@recoil';

export const DetailsTable = () => {
  const [detailId, setDetailId] = useRecoilState(idAtom('detailId'));

  const details = useRecoilValue(detailsAtom);

  const setActualResultJson = useSetRecoilState(actualResultJsonAtom);
  const setDetailsExpectedResultJson = useSetRecoilState(detailsExpectedResultJsonAtom);

  const resetDetailId = useResetRecoilState(idAtom('detailId'));
  const resetActualResultJson = useResetRecoilState(actualResultJsonAtom);
  const resetDetailsExpectedResultJson = useResetRecoilState(
    detailsExpectedResultJsonAtom,
  );

  return (
    <DetailsTableBox>
      <DataTable
        rows={details}
        columns={detailColumns}
        hideFooter
        disableColumnMenu
        columnHeaderHeight={40}
        rowHeight={40}
        onRowClick={(params, event) => {
          if (detailId === params.row.id && event.ctrlKey) {
            resetActualResultJson();
            resetDetailsExpectedResultJson();
            resetDetailId();
          } else if (detailId === params.row.id && !event.ctrlKey) {
            return;
          } else {
            setActualResultJson(
              JSON.parse(params.row.actualResult.replace(/\bNaN\b/g, 'null')),
            );
            setDetailsExpectedResultJson(
              JSON.parse(params.row.expectedResult.data.replace(/\bNaN\b/g, 'null')),
            );
            setDetailId(params.row.id);
          }
        }}
        disableMultipleRowSelection={true}
        disableColumnReorder={true}
        scrollbarSize={0}
      />
    </DetailsTableBox>
  );
};
