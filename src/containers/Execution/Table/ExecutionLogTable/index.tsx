import React from 'react';

import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';

import { ExecutionLogTableBox } from './style';
import { executionLogColumns } from './util';

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
} from '@recoil/status';

export const ExecutionLogTable = () => {
  const caseSetApi = useCaseSetApi();
  const caseLogApi = useCaseLogApi();

  const executionLogs = useRecoilValue(executionLogsAtom);
  const [open, setOpen] = useRecoilState(isExecutionDialogOpenAtom);
  const setCaseSets = useSetRecoilState(caseSetsAtom);
  const setCaseLogs = useSetRecoilState(caseLogsAtom);

  const handleOpen = () => {
    if (!caseSetApi) return;
    const getCaseSets = async () => {
      const response = await caseSetApi.getCaseSets();
      if (response) {
        setCaseSets(response);
      }
    };
    getCaseSets();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getDistinctCaseLogs = async (body: string) => {
    if (!caseLogApi) return;
    const response = await caseLogApi.getDistinctCaseLogsById({ executionId: body });
    if (response) {
      setCaseLogs(response);
    }
  };
  return (
    <ExecutionLogTableBox>
      <TableHeaderBox>
        Execution log
        <CreateButton onClick={handleOpen}>Create Execution</CreateButton>
        <CreateDialog
          open={open}
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
          }}
        />
      </TableDataBox>
    </ExecutionLogTableBox>
  );
};
