import React, { useState } from 'react';

import { GridColDef } from '@mui/x-data-grid';
import LegoView from 'lego-react-json-view';
import { useRecoilValue } from 'recoil';

import { CaseSetTableBox, CaseTableBox, ExpectedResultTableBox } from './style';

import {
  DataTable,
  TablesBox,
  SubTablesBox,
  CreateButton,
  TableHeaderBox,
  TableDataBox,
  // ReadOnlyDataTable,
  JSONDataBox,
} from '@/components';
import { caseSetAtom } from '@/recoil/status';

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

const casecolumns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
];

export const CaseSetPageLayout = () => {
  const caseSet = useRecoilValue(caseSetAtom);
  const [cases, setCases] = useState<{ name: string; id: string; data: object }[]>([]);
  // const [jsonData, setJsonData] = useState<object>();
  // const expectedResultApi = useExpectedResultApi();

  // const [expectedResult, setExpectedResult] = useRecoilState(expectedResultAtom);

  // const getExpectedResultByID = async (params: string) => {
  //   if (!expectedResultApi) return;
  //   const response = await expectedResultApi.getExpectedResultByID(params);
  //   if (response) {
  //     setExpectedResult(response);
  //   }
  // };
  const caseSetRows = caseSet.data.map((item) => ({
    type: item.type,
    title: item.title,
    cases: item.cases,
    id: item.id,
  }));
  const caseRows = cases.map((item) => ({
    name: item.name,
    id: item.id,
  }));
  // const expectedResultRows = expectedResult.data.map((item) => ({
  //   name: item.name,
  //   id: item.id,
  // }));
  return (
    <TablesBox>
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
              setCases(params.row.cases);
              // getExpectedResultByID(params.row.ID);
              // whycant();
            }}
          />
        </TableDataBox>
      </CaseSetTableBox>
      <SubTablesBox>
        <CaseTableBox>
          <TableHeaderBox>Case</TableHeaderBox>
          <TableDataBox>
            <DataTable
              rows={caseRows}
              columns={casecolumns}
              hideFooter
              disableColumnMenu
              columnHeaderHeight={48}
              rowHeight={48}
              // onRowClick={(params) => {
              //   setJsonData(params.row.data);
              // }}
            />
          </TableDataBox>
        </CaseTableBox>
        <ExpectedResultTableBox>
          <TableHeaderBox>Expected result</TableHeaderBox>
          <TableDataBox>
            {/* <ReadOnlyDataTable
              rows={expectedResultRows}
              columns={casecolumns}
              hideFooter
              disableColumnMenu
              columnHeaderHeight={48}
              rowHeight={48}
              disableRowSelectionOnClick
            /> */}
          </TableDataBox>
        </ExpectedResultTableBox>
      </SubTablesBox>
      <JSONDataBox>{/* <LegoView json={jsonData} /> */}</JSONDataBox>
    </TablesBox>
  );
};
