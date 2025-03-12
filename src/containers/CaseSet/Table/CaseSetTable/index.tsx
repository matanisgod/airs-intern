import React, { useEffect } from 'react';

import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';

import { CaseSetTableBox } from './style';
import { caseSetColumns } from './util';

import { useCaseApi, useCaseSetApi } from '@common/api';
import { TableHeaderBox, TableDataBox, DataTable, ErrorModal } from '@components';
import { CreateCaseSetDialog } from '@containers';
import {
  caseSetsAtom,
  casesAtom,
  caseJsonAtom,
  caseExpectedResultJsonAtom,
  expectedResultsAtom,
} from '@recoil/status';

export const CaseSetTable = () => {
  const caseApi = useCaseApi();
  const caseSetApi = useCaseSetApi();

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
  const caseSetPageCleaner = () => {
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
      <ErrorModal />
      <TableHeaderBox>
        Case set
        <CreateCaseSetDialog />
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
            caseSetPageCleaner();
          }}
        />
      </TableDataBox>
    </CaseSetTableBox>
  );
};
