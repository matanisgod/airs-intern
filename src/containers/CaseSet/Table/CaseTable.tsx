import React from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CaseTableBox } from '../style';
import { caseColumns } from '../util';

import { useExpectedResultApi } from '@/common/api/hooks/useExpectedResultApi';
import { TableHeaderBox, TableDataBox, DataTable } from '@/components';
import { casesAtom, jsonTopAtom, jsonBotAtom, expectedResultAtom } from '@/recoil/status';

export const CaseTable = () => {
  const setJsonTopData = useSetRecoilState(jsonTopAtom);
  const selectedCases = useRecoilValue(casesAtom);
  const expectedResultApi = useExpectedResultApi();
  const setExpectedResult = useSetRecoilState(expectedResultAtom);
  const setJsonBotData = useSetRecoilState(jsonBotAtom);

  const caseRows = selectedCases.map((item) => ({
    name: item.name,
    id: item.id,
    data: item.data,
  }));
  const getExpectedResultById = async (params: string) => {
    if (!expectedResultApi) return;
    const response = await expectedResultApi.getExpectedResultById(params);
    if (response) {
      setExpectedResult(response);
    }
  };

  return (
    <CaseTableBox>
      <TableHeaderBox>Case</TableHeaderBox>
      <TableDataBox>
        <DataTable
          rows={caseRows}
          columns={caseColumns}
          hideFooter
          disableColumnMenu
          columnHeaderHeight={48}
          rowHeight={48}
          onRowClick={(params) => {
            getExpectedResultById(params.row.id);
            setJsonTopData(JSON.parse(params.row.data.replace(/\bNaN\b/g, 'null')));
            setJsonBotData({});
          }}
        />
      </TableDataBox>
    </CaseTableBox>
  );
};
