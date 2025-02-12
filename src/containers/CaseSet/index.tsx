import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { CaseSetBox, GetCaseSetBox, GetCaseSetText } from './style';

import { useCaseSetApi } from '@/common/api/hooks/useCaseSetApi';
import { PageButton } from '@/components';
import { caseSetAtom } from '@/recoil/status';

const CaseSet = () => {
  const navi = useNavigate();
  const caseSetApi = useCaseSetApi();
  const [caseSet, setCaseSet] = useRecoilState(caseSetAtom);
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
      if (response) setCaseSet(response);
    };
    getCaseSet();
  }, [caseSetApi, setCaseSet]);

  // TODO: caseset table 만들기
  return (
    <CaseSetBox>
      <GetCaseSetBox>
        <GetCaseSetText>{JSON.stringify(caseSet, null, 2)}</GetCaseSetText>
      </GetCaseSetBox>
      {/*<DataTable />*/}

      <PageButton onClick={() => navi('/execution')}>move to execution</PageButton>
    </CaseSetBox>
  );
};

export default CaseSet;
