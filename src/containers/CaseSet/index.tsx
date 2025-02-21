import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import {
  CaseSetBox,
  CaseSetTableBox,
  CaseTableBox,
  ExpectedResultTableBox,
} from './style';
import { caseSetColumns, casecolumns } from './util';

import { useCaseSetApi, useExpectedResultApi } from '@/common/api/hooks/useCaseSetApi';
import {
  PageButton,
  DataTable,
  TablesBox,
  SubTablesBox,
  CreateButton,
  TableHeaderBox,
  TableDataBox,
  ReadOnlyDataTable,
} from '@/components';
import { caseSetAtom, expectedResultAtom } from '@/recoil/status';

const CaseSet = () => {
  const navi = useNavigate();
  const caseSetApi = useCaseSetApi();
  const expectedResultApi = useExpectedResultApi();
  const [caseSet, setCaseSet] = useRecoilState(caseSetAtom);
  const [expectedResult, setExpectedResult] = useRecoilState(expectedResultAtom);
  const [cases, setCases] = useState<{ name: string; id: string }[]>([]);
  const caseSetRows = caseSet.data.map((item, index) => ({
    type: item.type,
    title: item.title,
    id: index + 1,
    Cases: item.Cases,
    ID: item.id,
  }));

  const caseRows = cases.map((item, index) => ({
    name: item.name,
    Cases: item.id,
    id: index + 1,
  }));
  // const expectedResultRows = expectedResult.map((item, index) => ({
  //   name: item.name,
  //   Cases: item.id,
  //   id: index + 1,
  // }));

  const getExpectedResultByID = async (params: string) => {
    if (!expectedResultApi) return;
    const response = await expectedResultApi.getExpectedResultByID(params);
    if (response) {
      setExpectedResult(response);
    }
  };
  useEffect(() => {
    if (!caseSetApi) return;
    const getCaseSet = async () => {
      const response = await caseSetApi.getCaseSet();
      if (response) {
        setCaseSet(response);
      }
    };
    getCaseSet();
  }, [caseSetApi]);
  const whycant = () => {
    return console.log(expectedResult);
  };
  return (
    <React.Fragment>
      <CaseSetBox>
        <PageButton onClick={() => navi('/execution')}>Move to execution</PageButton>
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
                  setCases(params.row.Cases);
                  getExpectedResultByID(params.row.ID);
                  whycant();
                }}
              />
            </TableDataBox>
          </CaseSetTableBox>
          <SubTablesBox>
            <CaseTableBox>
              <TableHeaderBox>Case</TableHeaderBox>
              <TableDataBox>
                <ReadOnlyDataTable
                  rows={caseRows}
                  columns={casecolumns}
                  hideFooter
                  disableColumnMenu
                  columnHeaderHeight={48}
                  rowHeight={48}
                  disableRowSelectionOnClick
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
        </TablesBox>
      </CaseSetBox>
    </React.Fragment>
  );
};

export default CaseSet;
