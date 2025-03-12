import React, { useEffect } from 'react';

import { useSetRecoilState, useRecoilState, useResetRecoilState } from 'recoil';

import { ExecutionLogTableBox } from './style';
import { executionLogColumns } from './util';

import { useCaseLogApi, useExecutionApi } from '@common/api';
import { TableHeaderBox, TableDataBox, DataTable, ErrorModal } from '@components';
import { CreateExecutionDialog } from '@containers';
import {
  executionLogsAtom,
  caseLogsAtom,
  detailsAtom,
  actualResultJsonAtom,
  detailsExpectedResultJsonAtom,
  isErrorModalOpenAtom,
} from '@recoil/status';

export const ExecutionLogTable = () => {
  const caseLogApi = useCaseLogApi();
  const executionApi = useExecutionApi();
  const [executionLogs, setExecutionLogs] = useRecoilState(executionLogsAtom);
  const setErrorModalOpen = useSetRecoilState(isErrorModalOpenAtom);
  const setCaseLogs = useSetRecoilState(caseLogsAtom);
  const resetCaseLogs = useResetRecoilState(caseLogsAtom);
  const resetDetails = useResetRecoilState(detailsAtom);
  const resetActualResultJson = useResetRecoilState(actualResultJsonAtom);
  const resetDetailsExpectedResultJson = useResetRecoilState(
    detailsExpectedResultJsonAtom,
  );

  const getDistinctCaseLogs = async (body: string) => {
    if (!caseLogApi) return;
    const response = await caseLogApi.getDistinctCaseLogsById({ executionId: body });
    if (response) {
      setCaseLogs(response);
    } else {
      resetCaseLogs();
      setErrorModalOpen(true);
    }
  };

  const executionPageCleaner = () => {
    resetDetails();
    resetActualResultJson();
    resetDetailsExpectedResultJson();
  };
  useEffect(() => {
    if (!executionApi) return;
    const fetchExecutionLog = async () => {
      const response = await executionApi.getExecutionLogs();
      if (response) {
        setExecutionLogs(response);
      }
    };
    fetchExecutionLog();
  }, [executionApi, setExecutionLogs]);

  //TODO: Error 만들어지면 running으로 보이지만 refresh하면 error로 바뀌고 있음 소원님과 논의

  return (
    <ExecutionLogTableBox>
      <ErrorModal />
      <TableHeaderBox>
        Execution log
        <CreateExecutionDialog />
      </TableHeaderBox>
      <TableDataBox>
        <DataTable
          rows={executionLogs}
          columns={executionLogColumns}
          hideFooter
          disableColumnMenu
          columnHeaderHeight={48}
          rowHeight={48}
          onRowClick={(params) => {
            getDistinctCaseLogs(params.row.id);
            executionPageCleaner();
          }}
        />
      </TableDataBox>
    </ExecutionLogTableBox>
  );
};
