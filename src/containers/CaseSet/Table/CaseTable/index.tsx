import React from 'react';

import {
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
  useRecoilState,
} from 'recoil';

import { CaseTableBox } from './style';
import { caseColumns } from './util';

import { useExpectedResultApi } from '@common/api';
import { TableHeaderBox, TableDataBox, DataTable, DatagridDefaultBox } from '@components';
import {
  casesAtom,
  caseJsonAtom,
  caseExpectedResultJsonAtom,
  expectedResultsAtom,
  idAtom,
} from '@recoil';

export const CaseTable = () => {
  const expectedResultApi = useExpectedResultApi();

  const [caseId, setCaseId] = useRecoilState(idAtom('caseId'));

  const cases = useRecoilValue(casesAtom);

  const setExpectedResults = useSetRecoilState(expectedResultsAtom);
  const setCaseJson = useSetRecoilState(caseJsonAtom);

  const resetCaseExpectedResultJson = useResetRecoilState(caseExpectedResultJsonAtom);
  const resetCaseId = useResetRecoilState(idAtom('caseId'));
  const resetExpectedResults = useResetRecoilState(expectedResultsAtom);
  const resetCaseJson = useResetRecoilState(caseJsonAtom);

  const getExpectedResult = async (params: string) => {
    if (!expectedResultApi) return;
    const response = await expectedResultApi.getExpectedResultById(params);
    if (response) {
      setExpectedResults(response);
    }
  };

  const DatagridOverlay = () => <DatagridDefaultBox>Select case set</DatagridDefaultBox>;

  return (
    <CaseTableBox>
      <TableHeaderBox>Case</TableHeaderBox>
      <TableDataBox>
        <DataTable
          rows={cases}
          columns={caseColumns}
          hideFooter
          disableColumnMenu
          columnHeaderHeight={40}
          rowHeight={40}
          onRowClick={async (params, event) => {
            if (caseId === params.row.id && event.ctrlKey) {
              resetCaseExpectedResultJson();
              resetCaseJson();
              resetCaseId();
              resetExpectedResults();
            } else if (caseId === params.row.id && !event.ctrlKey) {
              return;
            } else {
              await getExpectedResult(params.row.id);
              setCaseJson(JSON.parse(params.row.data.replace(/\bNaN\b/g, 'null')));
              resetCaseExpectedResultJson();
              setCaseId(params.row.id);
            }
          }}
          slots={{
            noRowsOverlay: DatagridOverlay,
          }}
          disableMultipleRowSelection={true}
          disableColumnReorder={true}
          scrollbarSize={8}
        />
      </TableDataBox>
    </CaseTableBox>
  );
};
