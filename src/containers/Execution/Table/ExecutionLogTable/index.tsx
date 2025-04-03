import React, { useEffect } from 'react';

import { useSetRecoilState, useRecoilState, useResetRecoilState } from 'recoil';

import { ExecutionLogTableBox } from './style';
import { executionLogColumns } from './util';

import { useCaseLogApi, useCaseSetApi, useExecutionApi } from '@common/api';
import {
  TableHeaderBox,
  TableDataBox,
  DataTable,
  CreateButton,
  DatagridDefaultBox,
} from '@components';
import { CreateExecutionDialog } from '@containers';
import {
  executionLogsAtom,
  caseLogsAtom,
  detailsAtom,
  actualResultJsonAtom,
  detailsExpectedResultJsonAtom,
  isExecutionLogDialogOpenAtom,
  caseSetsAtom,
  isExecutionLogRowClickedAtom,
  detailIdAtom,
} from '@recoil';

export const ExecutionLogTable = () => {
  const caseLogApi = useCaseLogApi();
  const executionApi = useExecutionApi();
  const caseSetApi = useCaseSetApi();

  const [executionLogs, setExecutionLogs] = useRecoilState(executionLogsAtom);
  const [isExecutionDialogOpen, setIsExecutionDialogOpen] = useRecoilState(
    isExecutionLogDialogOpenAtom,
  );
  const setCaseSets = useSetRecoilState(caseSetsAtom);
  const setCaseLogs = useSetRecoilState(caseLogsAtom);
  const setIsExecutionLogRowClicked = useSetRecoilState(isExecutionLogRowClickedAtom);

  const resetDetailId = useResetRecoilState(detailIdAtom);
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
    }
  };

  const clearExecutionPage = () => {
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
  const fetchCaseSets = async () => {
    if (!caseSetApi) return;

    const response = await caseSetApi.getCaseSets();
    if (response) {
      setCaseSets(response);
    }
  };
  const onCreateExecutionLogButtonClick = () => {
    setIsExecutionDialogOpen(true);
    fetchCaseSets();
  };

  const DatagridOverlay = () => <DatagridDefaultBox>Loading...</DatagridDefaultBox>;

  return (
    <ExecutionLogTableBox>
      <TableHeaderBox>
        Execution log
        <CreateButton onClick={onCreateExecutionLogButtonClick}>
          Create Execution
        </CreateButton>
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
            clearExecutionPage();
            setIsExecutionLogRowClicked(true);
            resetDetailId();
          }}
          slots={{
            noRowsOverlay: DatagridOverlay,
          }}
          scrollbarSize={8}
        />
      </TableDataBox>
      {isExecutionDialogOpen && <CreateExecutionDialog />}
    </ExecutionLogTableBox>
  );
};
