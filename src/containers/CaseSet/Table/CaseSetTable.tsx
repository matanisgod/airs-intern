import React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CaseSetTableBox } from '../style';

import { useCaseApi } from '@/common/api/hooks/useCaseApi';
import { CreateButton, TableHeaderBox, TableDataBox, DataTable } from '@/components';
import {
  caseSetsAtom,
  casesAtom,
  jsonTopAtom,
  jsonBotAtom,
  expectedResultAtom,
} from '@/recoil/status';

const caseSetColumns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Title',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  // {
  //   field: 'actions',
  //   headerName: 'Actions',
  //   flex: 0.4,
  //   sortable: false,
  //   headerAlign: 'center',
  //   align: 'center',
  //   renderHeader: () => <StopAllButton>Stop all</StopAllButton>,
  //   renderCell: () => <StopButton>Stop</StopButton>,
  // },
];
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
