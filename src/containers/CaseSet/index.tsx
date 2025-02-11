import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { CaseSetBox, GetCaseSetBox, GetCaseSetText } from './style';
import { CaseSetText } from './style';

import { useCaseSetApi } from '@/common/api/hooks/useCaseSetApi';
import { caseSetAtom } from '@/recoil/status';
import { PageButton } from '@components';

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
  // : getCaseSet을 버튼을 눌렀을 때 동작하는 식으로 수정해야 함
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
      <CaseSetText>Caseset</CaseSetText>
      <GetCaseSetBox>
        <GetCaseSetText>{JSON.stringify(caseSet, null, 2)}</GetCaseSetText>
      </GetCaseSetBox>
      <PageButton onClick={() => navi('/execution')}>move to execution</PageButton>
    </CaseSetBox>
  );
};

export default CaseSet;
