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

    const response = await caseLogApi.getDetailsById({
      executionLogId: executionLogId,
      caseId: caseId,
      expectedResultId: expectedResultId,
    });
    if (response) {
      setDetails(response);
    }
  };
  const cleanExecutionPage = () => {
    resetActualResultJson();
    resetDetailsExpectedResultJson();
  };

  const DatagridOverlay = () => (
    <DatagridDefaultBox>Select execution log</DatagridDefaultBox>
  );

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
            cleanExecutionPage();
          }}
          slots={{
            noRowsOverlay: DatagridOverlay,
          }}
        />
      </TableDataBox>
    </CaseLogTableBox>
  );
};
