import React, { useEffect } from 'react';

import { useSetRecoilState, useRecoilState, useResetRecoilState } from 'recoil';

import { ExecutionLogTableBox } from './style';
import { executionLogColumns } from './util';

import { useCaseSetApi, useCaseLogApi, useExecutionApi } from '@common/api';
import {
  CreateButton,
  TableHeaderBox,
  TableDataBox,
  DataTable,
  CreateDialog,
  CreateDialogTitle,
  ErrorModal,
} from '@components';
import { CreateExecutionDialog } from '@containers';
import {
  caseSetsAtom,
  isExecutionDialogOpenAtom,
  executionLogsAtom,
  caseLogsAtom,
  detailsAtom,
  actualResultJsonAtom,
  detailsExpectedResultJsonAtom,
  isErrorModalOpenAtom,
} from '@recoil/status';

export const ExecutionLogTable = () => {
  const caseSetApi = useCaseSetApi();
  const caseLogApi = useCaseLogApi();
  const executionApi = useExecutionApi();
  const [executionDialogOpen, setExecutionDialogOpen] = useRecoilState(
    isExecutionDialogOpenAtom,
  );
  const [executionLogs, setExecutionLogs] = useRecoilState(executionLogsAtom);
  const setErrorModalOpen = useSetRecoilState(isErrorModalOpenAtom);
  const setCaseSets = useSetRecoilState(caseSetsAtom);
  const setCaseLogs = useSetRecoilState(caseLogsAtom);
  const resetCaseLogs = useResetRecoilState(caseLogsAtom);
  const resetDetails = useResetRecoilState(detailsAtom);
  const resetActualResultJson = useResetRecoilState(actualResultJsonAtom);
  const resetDetailsExpectedResultJson = useResetRecoilState(
    detailsExpectedResultJsonAtom,
  );
  const handleOpen = () => {
    if (!caseSetApi) return;
    const fetchCaseSets = async () => {
      const response = await caseSetApi.getCaseSets();
      if (response) {
        setCaseSets(response);
      }
    };
    fetchCaseSets();
    setExecutionDialogOpen(true);
  };
  const handleClose = () => {
    setExecutionDialogOpen(false);
  };
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

  const thanos = () => {
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
  return (
    <ExecutionLogTableBox>
      <ErrorModal />
      <TableHeaderBox>
        Execution log
        <CreateButton onClick={handleOpen}>Create Execution</CreateButton>
        <CreateDialog
          open={executionDialogOpen}
          onClose={(_, reason) => {
            if (reason === 'backdropClick') return;
            handleClose();
          }}
          disableRestoreFocus
        >
          <CreateDialogTitle>Create execution</CreateDialogTitle>
          <CreateExecutionDialog />
        </CreateDialog>
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
            thanos();
          }}
        />
      </TableDataBox>
    </ExecutionLogTableBox>
  );
};
