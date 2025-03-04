import React from 'react';

import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';

import { CreateExecutionDialog } from '../dialog';
import { ExecutionLogTableBox } from '../style';
import { executionLogColumns } from '../util';

import { useCaseSetApi } from '@/common/api/hooks/useCaseSetApi';
// import { useExecutionApi } from '@/common/api/hooks/useExecutionApi';
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
  // const setSelectedCaseLogs = useSetRecoilState(executionLogAtom);
  // const executionApi = useExecutionApi();
  const handleOpen = () => {
    if (!caseSetApi) return;
    const getCaseSets = async () => {
      const response = await caseSetApi.getCaseSets();
      if (response) {
        setCaseSet(response);
      }
    };
    getCaseSets();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const executionLogRows = executionLogs.map((item) => ({
    performer: item.performer,
    createdAt: item.createdAt,
    status: item.status,
    id: item.id,
  }));
  // const getExecutionLogById = async (params: string) => {
  //   if (!executionApi) return;
  //   const response = await executionApi.getExecutionLogById(params);
  //   if (response) {
  //     setSelectedCaseLogs(response);
  //   }
  // };
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
          // onRowClick={(params) => {
          //   getExecutionLogById(params.row.id);
          // }}
        />
      </TableDataBox>
    </ExecutionLogTableBox>
  );
};
