import React, { useEffect } from 'react';

import { useSetRecoilState, useRecoilState, useResetRecoilState } from 'recoil';

import { ExecutionLogTableBox, CreateExecutionButton, ActionButton } from './style';
import { executionLogColumns } from './util';

import { useCaseLogApi, useCaseSetApi, useExecutionApi } from '@common/api';
import {
  TableHeaderBox,
  TableDataBox,
  DataTable,
  DatagridDefaultBox,
  ButtonBox,
  RefreshButton,
  CancelButton,
} from '@components';
import { CreateExecutionDialog } from '@containers';
import {
  executionLogsAtom,
  caseLogsAtom,
  detailsAtom,
  actualResultJsonAtom,
  detailsExpectedResultJsonAtom,
  caseSetsAtom,
  dichotomyAtom,
  idAtom,
  stopTargetAtom,
} from '@recoil';

export const ExecutionLogTable = () => {
  const caseLogApi = useCaseLogApi();
  const executionApi = useExecutionApi();
  const caseSetApi = useCaseSetApi();

  const [executionLogs, setExecutionLogs] = useRecoilState(executionLogsAtom);
  const [isExecutionDialogOpen, setIsExecutionDialogOpen] = useRecoilState(
    dichotomyAtom('isExecutionLogDialogOpen'),
  );
  const [executionLogId, setExecutionLogId] = useRecoilState(idAtom('executionLogId'));

  const setCaseSets = useSetRecoilState(caseSetsAtom);
  const setCaseLogs = useSetRecoilState(caseLogsAtom);
  const setIsStopModalOpen = useSetRecoilState(dichotomyAtom('isStopModalOpen'));
  const setStopTarget = useSetRecoilState(stopTargetAtom);

  const resetExecutionLogId = useResetRecoilState(idAtom('executionLogId'));
  const resetCaseLogId = useResetRecoilState(idAtom('caseLogId'));
  const resetCaseLogs = useResetRecoilState(caseLogsAtom);
  const resetDetails = useResetRecoilState(detailsAtom);
  const resetActualResultJson = useResetRecoilState(actualResultJsonAtom);
  const resetDetailsExpectedResultJson = useResetRecoilState(
    detailsExpectedResultJsonAtom,
  );

  const getDistinctCaseLogs = async (executionId: string) => {
    if (!caseLogApi) return;
    const response = await caseLogApi.getDistinctCaseLogsById({ executionId });
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
    resetCaseLogId();
  };
  const DatagridOverlay = () => <DatagridDefaultBox>No rows</DatagridDefaultBox>;
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

  return (
    <ExecutionLogTableBox>
      <TableHeaderBox>
        Execution log
        <ButtonBox>
          <ActionButton
            onClick={() => {
              setStopTarget('All');
              setIsStopModalOpen(true);
            }}
          >
            {CancelButton()}
          </ActionButton>
          <ActionButton
            onClick={async () => {
              const response = await executionApi?.getExecutionLogs();
              if (response) {
                setExecutionLogs(response);
              }
            }}
          >
            {RefreshButton()}
          </ActionButton>
          <CreateExecutionButton onClick={onCreateExecutionLogButtonClick}>
            Create Execution
          </CreateExecutionButton>
        </ButtonBox>
      </TableHeaderBox>
      <TableDataBox>
        <DataTable
          rows={executionLogs}
          columns={executionLogColumns}
          hideFooter
          disableColumnMenu
          columnHeaderHeight={48}
          rowHeight={48}
          onRowClick={async (params, event) => {
            if (executionLogId === params.row.id && event.ctrlKey) {
              clearExecutionPage();
              resetExecutionLogId();
              resetCaseLogs();
            } else if (executionLogId !== params.row.id && event.ctrlKey) {
              return;
            } else if (executionLogId === params.row.id && !event.ctrlKey) {
              return;
            } else {
              await getDistinctCaseLogs(params.row.id);
              clearExecutionPage();
              setExecutionLogId(params.row.id);
            }
          }}
          slots={{
            noRowsOverlay: DatagridOverlay,
          }}
          scrollbarSize={8}
        />
      </TableDataBox>
      {/* Dialog */}
      {isExecutionDialogOpen && <CreateExecutionDialog />}
    </ExecutionLogTableBox>
  );
};
