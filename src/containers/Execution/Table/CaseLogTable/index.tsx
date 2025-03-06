import React from 'react';

import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';

import { CaseLogTableBox } from './style';
import { caseLogColumns } from './util';

import { useCaseLogApi } from '@/common/api';
import { TableHeaderBox, TableDataBox, DataTable } from '@components';
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
  const getDetails = async (body: string, _body: string, body_: string) => {
    if (!caseLogApi) return;
    const response = await caseLogApi.getDetailsById({
      executionLogId: body,
      caseId: _body,
      expectedResultId: body_,
    });
    if (response) {
      setDetails(response);
    }
  };
  const thanos = () => {
    resetActualResultJson();
    resetDetailsExpectedResultJson();
  };
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
            thanos();
          }}
        />
      </TableDataBox>
    </CaseLogTableBox>
  );
};
