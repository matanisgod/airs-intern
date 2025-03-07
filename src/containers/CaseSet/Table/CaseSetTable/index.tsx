import React, { useEffect } from 'react';

import {
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
  useRecoilState,
} from 'recoil';

import { CaseSetTableBox } from './style';
import { caseSetColumns } from './util';

import { useCaseApi, useCaseSetApi } from '@common/api';
import {
  CreateButton,
  TableHeaderBox,
  TableDataBox,
  DataTable,
  CreateDialog,
  CreateDialogTitle,
} from '@components';
import { CreateCaseSetDialog } from '@containers';
import {
  caseSetsAtom,
  casesAtom,
  caseJsonAtom,
  caseExpectedResultJsonAtom,
  expectedResultsAtom,
  isCaseSetDialogOpenAtom,
} from '@recoil/status';

export const CaseSetTable = () => {
  const caseApi = useCaseApi();
  const caseSetApi = useCaseSetApi();

  const caseSets = useRecoilValue(caseSetsAtom);
  const [open, setOpen] = useRecoilState(isCaseSetDialogOpenAtom);
  const setCaseSets = useSetRecoilState(caseSetsAtom);

  const setCases = useSetRecoilState(casesAtom);
  const resetExpectedResults = useResetRecoilState(expectedResultsAtom);
  const resetCaseJson = useResetRecoilState(caseJsonAtom);
  const resetCaseExpectedResultJson = useResetRecoilState(caseExpectedResultJsonAtom);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getCasesByCaseSet = async (params: string) => {
    if (!caseApi) return;
    const response = await caseApi.getCasesByCaseSetId(params);
    if (response) {
      setCases(response);
    }
  };
  const thanos = () => {
    resetExpectedResults();
    resetCaseJson();
    resetCaseExpectedResultJson();
  };

  useEffect(() => {
    if (!caseSetApi) return;
    const fetchCaseSets = async () => {
      const response = await caseSetApi.getCaseSets();
      if (response) {
        setCaseSets(response);
      }
    };
    fetchCaseSets();
  }, [caseSetApi, setCaseSets]);
  return (
    <CaseSetTableBox>
      <TableHeaderBox>
        Case set
        <CreateButton onClick={handleOpen}>Create case set</CreateButton>
        <CreateDialog
          open={open}
          onClose={(_, reason) => {
            if (reason === 'backdropClick') return;
            handleClose();
          }}
          disableRestoreFocus
        >
          <CreateDialogTitle>Create case set</CreateDialogTitle>
          <CreateCaseSetDialog />
        </CreateDialog>
      </TableHeaderBox>
      <TableDataBox>
        <DataTable
          rows={caseSets}
          columns={caseSetColumns}
          hideFooter
          disableColumnMenu
          columnHeaderHeight={48}
          rowHeight={48}
          onRowClick={(params) => {
            getCasesByCaseSet(params.row.id);
            thanos();
          }}
        />
      </TableDataBox>
    </CaseSetTableBox>
  );
};
