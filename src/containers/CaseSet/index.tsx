import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { CaseSetBox } from './style';

import { useCaseSetApi } from '@/common/api/hooks/useCaseSetApi';
import { PageButton } from '@/components';
import DataTable from '@/components/DataGrid';
import { caseSetAtom } from '@/recoil/status';

const CaseSet = () => {
  const navi = useNavigate();
  const caseSetApi = useCaseSetApi();
  const setCaseSet = useSetRecoilState(caseSetAtom);

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
        const getTT = response.map((item) => ({
          type: item.type,
          title: item.title,
        }));
        setCaseSet(getTT);
      }
    };
    getCaseSet();
  }, [caseSetApi, setCaseSet]);

  return (
    <React.Fragment>
      <DataTable />
      <CaseSetBox>
        <PageButton onClick={() => navi('/execution')}>move to execution</PageButton>
      </CaseSetBox>
    </React.Fragment>
  );
};

export default CaseSet;
