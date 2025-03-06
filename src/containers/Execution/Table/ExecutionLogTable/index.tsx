import React from 'react';

import {
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
  useResetRecoilState,
} from 'recoil';

import { ExecutionLogTableBox } from './style';
import { ErrorModal, executionLogColumns } from './util';

import { useCaseSetApi, useCaseLogApi } from '@common/api';
import {
  CreateButton,
  TableHeaderBox,
  TableDataBox,
  DataTable,
  CreateDialog,
  CreateDialogTitle,
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
  executionIdAtom,
} from '@recoil/status';

export const ExecutionLogTable = () => {
  const caseSetApi = useCaseSetApi();
  const caseLogApi = useCaseLogApi();

  const executionLogs = useRecoilValue(executionLogsAtom);
  const [executionDialogOpen, setExecutionDialogOpen] = useRecoilState(
    isExecutionDialogOpenAtom,
  );
  const setErrorModalOpen = useSetRecoilState(isErrorModalOpenAtom);
  const setCaseSets = useSetRecoilState(caseSetsAtom);
  const setCaseLogs = useSetRecoilState(caseLogsAtom);
  const setExecutionId = useSetRecoilState(executionIdAtom);
  const resetCaseLogs = useResetRecoilState(caseLogsAtom);
  const resetDetails = useResetRecoilState(detailsAtom);
  const resetActualResultJson = useResetRecoilState(actualResultJsonAtom);
  const resetDetailsExpectedResultJson = useResetRecoilState(
    detailsExpectedResultJsonAtom,
  );
  const handleOpen = () => {
    if (!caseSetApi) return;
    const getCaseSets = async () => {
      const response = await caseSetApi.getCaseSets();
      if (response) {
        setCaseSets(response);
      }
    };
    getCaseSets();
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
            setExecutionId(params.row.id);
            thanos();
          }}
        />
      </TableDataBox>
    </ExecutionLogTableBox>
  );
};
