import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageButton, CaseSetText } from '@components';
import { CaseSetBox } from './style';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useCaseSetApi } from '@/common/api/hooks/useCaseSetApi';
import { caseSetAtom } from '@/recoil/status';
import { Box } from '@mui/material';

const CaseSet: React.FC = () => {
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
    //getCaseSet();
  }, [caseSetApi, setCaseSet]);

  return (
    <CaseSetBox>
      <CaseSetText>Caseset</CaseSetText>
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {JSON.stringify(caseSet, null, 2)}
      </pre>
      <PageButton onClick={() => navi('/execution')}>move to execution</PageButton>
    </CaseSetBox>
  );
};

export default CaseSet;
