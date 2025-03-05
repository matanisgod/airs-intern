import React from 'react';

import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';

import { CaseSetTableBox } from './style';
import { caseSetColumns } from './util';

import { useCaseApi } from '@common/api';
import { CreateButton, TableHeaderBox, TableDataBox, DataTable } from '@components';
import {
  caseSetsAtom,
  casesAtom,
  jsonTopAtom,
  jsonBotAtom,
  expectedResultsAtom,
} from '@recoil/status';

export const CaseSetTable = () => {
  const caseApi = useCaseApi();

  const caseSets = useRecoilValue(caseSetsAtom);
  const setCases = useSetRecoilState(casesAtom);
  const setExpectedResults = useResetRecoilState(expectedResultsAtom);
  const setJsonTop = useResetRecoilState(jsonTopAtom);
  const setJsonBot = useResetRecoilState(jsonBotAtom);

  const getCasesByCaseSet = async (params: string) => {
    if (!caseApi) return;
    const response = await caseApi.getCasesByCaseSetId(params);
    if (response) {
      setCases(response);
    }
  };
  const thanos = () => {
    setExpectedResults();
    setJsonTop();
    setJsonBot();
  };

  return (
    <CaseSetTableBox>
      <TableHeaderBox>
        Case set
        <CreateButton>Create case set</CreateButton>
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
