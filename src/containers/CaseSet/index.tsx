import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import {
  CaseSetBox,
  CaseSetTableBox,
  CaseTableBox,
  ExpectedResultTableBox,
} from './style';
import { caseSetColumns, casecolumns } from './util';

import { useCaseSetApi } from '@/common/api/hooks/useCaseSetApi';
import {
  PageButton,
  DataTable,
  TablesBox,
  SubTablesBox,
  CreateButton,
  TableHeaderBox,
  TableDataBox,
} from '@/components';
import { caseSetAtom } from '@/recoil/status';

const CaseSet = () => {
  const navi = useNavigate();
  const caseSetApi = useCaseSetApi();
  const setCaseSet = useSetRecoilState(caseSetAtom);
  const caseSet = useRecoilValue(caseSetAtom);
  const caseSetRows = caseSet.map((item, index) => ({
    type: item.type,
    title: item.title,
    id: index + 1,
    Cases: item.Cases,
  }));
  const [cases, setCases] = useState<{ name: string; id: string }[]>([]);
  const caseRows = cases.map((item, index) => ({
    name: item.name,
    Cases: item.id,
    id: index + 1,
  }));
  const [caseTitle, setCaseTitle] = useState<string>();
  /*
  useEffect(() => {
    if (!caseSetApi) return;
    const importCaseSet = async () => {
      return await caseSetApi.importCaseSet();
    };
  }, [caseSetApi]);
  */

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
                  setCaseTitle(params.row.title);
                }}
              />
            </TableDataBox>
          </CaseSetTableBox>
          <SubTablesBox>
            <CaseTableBox>
              <TableHeaderBox>Case {caseTitle}</TableHeaderBox>
              <TableDataBox>
                <DataTable
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
              <TableDataBox>zxcv</TableDataBox>
            </ExpectedResultTableBox>
          </SubTablesBox>
        </TablesBox>
      </CaseSetBox>
    </React.Fragment>
  );
};

export default CaseSet;
