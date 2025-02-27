import React, { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import { CaseSetBox } from './style';
import { CaseJson } from './Table/CaseJson';
import { CaseSetTable } from './Table/CaseSetTable';
import { CaseTable } from './Table/CaseTable';
import { ExpectedResultJson } from './Table/ExpectedResultJson';
import { ExpectedResultTable } from './Table/ExpectedResultTable';

import { useCaseSetApi } from '@/common/api/hooks/useCaseSetApi';
import { TablesBox, CaseSetSubTablesBox, JSONDataBox } from '@/components';
import { caseSetsAtom } from '@/recoil/status';

const CaseSet = () => {
  const caseSetApi = useCaseSetApi();
  const setCaseSet = useSetRecoilState(caseSetsAtom);

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
        <TablesBox>
          <CaseSetTable />
          <CaseSetSubTablesBox>
            <CaseTable />
            <ExpectedResultTable />
          </CaseSetSubTablesBox>
          <JSONDataBox>
            <CaseJson />
            <ExpectedResultJson />
          </JSONDataBox>
        </TablesBox>
      </CaseSetBox>
    </React.Fragment>
  );
};

export default CaseSet;
