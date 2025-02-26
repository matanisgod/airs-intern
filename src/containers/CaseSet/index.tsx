import React, { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import { CaseSetBox } from './style';
import { CaseSetPageLayout } from './util';

import { useCaseSetApi } from '@/common/api/hooks/useCaseSetApi';
import { caseSetAtom } from '@/recoil/status';

const CaseSet = () => {
  const caseSetApi = useCaseSetApi();
  const setCaseSet = useSetRecoilState(caseSetAtom);

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
  // const whycant = () => {
  //   return console.log(expectedResult);
  // };
  return (
    <React.Fragment>
      <CaseSetBox>
        <CaseSetPageLayout />
      </CaseSetBox>
    </React.Fragment>
  );
};

export default CaseSet;
