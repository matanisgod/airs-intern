import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import {
  CaseSetBox,
  CaseSetTableBox,
  CaseTableBox,
  ExpectedResultTableBox,
} from './style';
import { columns } from './util';

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
  const rows = caseSet.map((item, index) => ({
    type: item.type,
    title: item.title,
    id: index + 1,
  }));
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
  }, [caseSetApi, setCaseSet]);

  //TODO: datagrid 무슨 기능 있는지 알아보면 좋음
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
                rows={rows}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
                hideFooter={true}
                disableColumnMenu
                autoHeight
              />
            </TableDataBox>
          </CaseSetTableBox>
          <SubTablesBox>
            <CaseTableBox>
              <TableHeaderBox>Case</TableHeaderBox>
              <TableDataBox>asdf</TableDataBox>
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
