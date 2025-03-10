import React from 'react';

import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';

import { CaseTableBox } from './style';
import { caseColumns } from './util';

import { useExpectedResultApi } from '@common/api';
import { TableHeaderBox, TableDataBox, DataTable } from '@components';
import {
  casesAtom,
  caseJsonAtom,
  caseExpectedResultJsonAtom,
  expectedResultsAtom,
} from '@recoil/status';

export const CaseTable = () => {
  const expectedResultApi = useExpectedResultApi();

  const cases = useRecoilValue(casesAtom);
  const setExpectedResults = useSetRecoilState(expectedResultsAtom);
  const setCaseJson = useSetRecoilState(caseJsonAtom);
  const resetCaseExpectedResultJson = useResetRecoilState(caseExpectedResultJsonAtom);

  const getExpectedResult = async (params: string) => {
    if (!expectedResultApi) return;
    const response = await expectedResultApi.getExpectedResultById(params);
    if (response) {
      setExpectedResults(response);
    }
  };

  return (
    <CaseTableBox>
      <TableHeaderBox>Case</TableHeaderBox>
      <TableDataBox>
        <DataTable
          rows={cases}
          columns={caseColumns}
          hideFooter
          disableColumnMenu
          columnHeaderHeight={48}
          rowHeight={48}
          onRowClick={(params) => {
            getExpectedResult(params.row.id);
            setCaseJson(JSON.parse(params.row.data.replace(/\bNaN\b/g, 'null')));
            resetCaseExpectedResultJson();
          }}
          localeText={{
            noRowsLabel: 'Select case set',
          }}
        />
      </TableDataBox>
    </CaseTableBox>
  );
};
