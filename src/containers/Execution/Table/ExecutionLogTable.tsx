import React from 'react';

import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';

import { CreateExecutionDialog } from '../dialog';
import { ExecutionLogTableBox } from '../style';
import { executionLogColumns } from '../util';

import { useCaseSetApi } from '@/common/api/hooks/useCaseSetApi';
import {
  CreateButton,
  TableHeaderBox,
  TableDataBox,
  DataTable,
  CreateDialog,
  CreateDialogTitle,
} from '@/components';
import {
  caseSetsAtom,
  executionDialogIsOpenAtom,
  executionLogsAtom,
} from '@/recoil/status';

export const ExecutionLogTable = () => {
  const caseSetApi = useCaseSetApi();
  const setCaseSet = useSetRecoilState(caseSetsAtom);
  const [open, setOpen] = useRecoilState(executionDialogIsOpenAtom);
  const executionLogs = useRecoilValue(executionLogsAtom);

  const handleOpen = () => {
    if (!caseSetApi) return;
    const getCaseSet = async () => {
      const response = await caseSetApi.getCaseSet();
      if (response) {
        setCaseSet(response);
      }
    };
    getCaseSet();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const executionLogRows = executionLogs.data.map((item) => ({
    performer: item.performer,
    createdAt: item.createdAt,
    status: item.status,
    id: item.id,
  }));
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
          rows={executionLogRows}
          columns={executionLogColumns}
          hideFooter
          disableColumnMenu
          columnHeaderHeight={48}
          rowHeight={48}
        />
      </TableDataBox>
    </ExecutionLogTableBox>
  );
};
