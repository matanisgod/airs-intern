import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { CaseSetBox, TableWrapperBox, TableViewBox } from './style';
import { columns } from './util';

import { useCaseSetApi } from '@/common/api/hooks/useCaseSetApi';
import { PageButton } from '@/components';
import { DataTable } from '@/components/DataGrid';
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
        <PageButton onClick={() => navi('/execution')}>move to execution</PageButton>
        <TableViewBox>
          <TableWrapperBox>
            <DataTable
              rows={rows}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              hideFooter={true}
            />
          </TableWrapperBox>
        </TableViewBox>
      </CaseSetBox>
    </React.Fragment>
  );
};

export default CaseSet;
