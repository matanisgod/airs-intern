import React from 'react';

import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';

import { CaseLogTableBox } from './style';
import { caseLogColumns } from './util';

import { useCaseLogApi } from '@/common/api';
import { TableHeaderBox, TableDataBox, DataTable, DatagridDefaultBox } from '@components';
import {
  actualResultJsonAtom,
  caseLogsAtom,
  detailsAtom,
  detailsExpectedResultJsonAtom,
} from '@recoil/status';

export const CaseLogTable = () => {
  const caseLogApi = useCaseLogApi();

  const caseLogs = useRecoilValue(caseLogsAtom);

  const setDetails = useSetRecoilState(detailsAtom);

  const resetActualResultJson = useResetRecoilState(actualResultJsonAtom);
  const resetDetailsExpectedResultJson = useResetRecoilState(
    detailsExpectedResultJsonAtom,
  );
  const getDetails = async (
    executionLogId: string,
    caseId: string,
    expectedResultId: string,
  ) => {
    if (!caseLogApi) return;
    //TODO: 변수명 수정
    const response = await caseLogApi.getDetailsById({
      executionLogId: executionLogId,
      caseId: caseId,
      expectedResultId: expectedResultId,
    });
    if (response) {
      setDetails(response);
    }
  };
  //TODO: 함수명 수정
  const executionPageCleaner = () => {
    resetActualResultJson();
    resetDetailsExpectedResultJson();
  };

  const Overlay = () => <DatagridDefaultBox>Select execution log</DatagridDefaultBox>; //TODO: 이름 변경

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
          onRowClick={(params) => {
            getDetails(
              params.row.executionLogId,
              params.row.caseId,
              params.row.expectedResultId,
            );
            executionPageCleaner();
          }}
          slots={{
            noRowsOverlay: Overlay,
          }}
        />
      </TableDataBox>
    </CaseLogTableBox>
  );
};
