import React from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CaseSetTableBox } from '../style';
import { caseSetColumns } from '../util';

import { useCaseApi } from '@/common/api/hooks/useCaseApi';
import { CreateButton, TableHeaderBox, TableDataBox, DataTable } from '@/components';
import {
  caseSetsAtom,
  casesAtom,
  jsonTopAtom,
  jsonBotAtom,
  expectedResultAtom,
} from '@/recoil/status';

export const CaseSetTable = () => {
  const caseSets = useRecoilValue(caseSetsAtom);
  const caseApi = useCaseApi();
  const setSelectedCases = useSetRecoilState(casesAtom);
  const setJsonTopData = useSetRecoilState(jsonTopAtom);
  const setJsonBotData = useSetRecoilState(jsonBotAtom);
  const setExpectedResult = useSetRecoilState(expectedResultAtom);

  const caseSetRows = caseSets.data.map((item) => ({
    type: item.type,
    title: item.title,
    cases: item.cases,
    id: item.id,
  }));
  const getCasesByCaseSetId = async (params: string) => {
    if (!caseApi) return;
    const response = await caseApi.getCasesByCaseSetId(params);
    if (response) {
      setSelectedCases(response);
    }
  };
  return (
    <CaseSetTableBox>
      <TableHeaderBox>
        Case set
        <CreateButton>Create case set</CreateButton>
      </TableHeaderBox>
      <TableDataBox>
        <DataTable
          rows={caseSetRows}
          columns={caseSetColumns}
          hideFooter
          disableColumnMenu
          columnHeaderHeight={48}
          rowHeight={48}
          onRowClick={(params) => {
            getCasesByCaseSetId(params.row.id);
            setJsonTopData({});
            setJsonBotData({});
            setExpectedResult({ message: '', data: [] });
          }}
        />
      </TableDataBox>
    </CaseSetTableBox>
  );
};
