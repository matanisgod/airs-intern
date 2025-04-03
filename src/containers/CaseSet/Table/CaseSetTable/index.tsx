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
  TableHeaderBox,
  TableDataBox,
  DataTable,
  CreateButton,
  DatagridDefaultBox,
} from '@components';
import { CreateCaseSetDialog } from '@containers';
import {
  caseSetsAtom,
  casesAtom,
  caseJsonAtom,
  caseExpectedResultJsonAtom,
  expectedResultsAtom,
  isCaseSetDialogOpenAtom,
} from '@recoil';

export const CaseSetTable = () => {
  const caseApi = useCaseApi();
  const caseSetApi = useCaseSetApi();

  const [isCaseSetDialogOpen, setIsCaseSetDialogOpen] = useRecoilState(
    isCaseSetDialogOpenAtom,
  );

  const caseSets = useRecoilValue(caseSetsAtom);

  const setCaseSets = useSetRecoilState(caseSetsAtom);
  const setCases = useSetRecoilState(casesAtom);

  const resetExpectedResults = useResetRecoilState(expectedResultsAtom);
  const resetCaseJson = useResetRecoilState(caseJsonAtom);
  const resetCaseExpectedResultJson = useResetRecoilState(caseExpectedResultJsonAtom);

  const getCasesByCaseSet = async (params: string) => {
    if (!caseApi) return;
    const response = await caseApi.getCasesByCaseSetId(params);
    if (response) {
      setCases(response);
    }
  };
  const cleanCaseSetPage = () => {
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

  const onCreateCaseSetButtonClick = () => {
    setIsCaseSetDialogOpen(true);
  };
  const DatagridOverlay = () => <DatagridDefaultBox>Loading...</DatagridDefaultBox>;

  return (
    <CaseSetTableBox>
      <TableHeaderBox>
        Case set
        <CreateButton onClick={onCreateCaseSetButtonClick}>Create case set</CreateButton>
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
            cleanCaseSetPage();
          }}
          slots={{
            noRowsOverlay: DatagridOverlay,
          }}
          scrollbarSize={8}
        />
      </TableDataBox>
      {isCaseSetDialogOpen && <CreateCaseSetDialog />}
    </CaseSetTableBox>
  );
};
