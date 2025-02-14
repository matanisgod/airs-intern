import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { CaseSetBox, GetCaseSetBox, GetCaseSetText } from './style';
//import { CaseSetTable } from './util';

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
  /*

  components/Datagrid/index.tsx 에서 DataTable 가져와서 그리기
  결국 DataTable도 testSetsList도 GET api 정제해서 써야 함
  근데 서버가 터짐 왜?

  */
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
