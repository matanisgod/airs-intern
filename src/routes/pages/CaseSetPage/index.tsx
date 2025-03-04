import React, { useEffect } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { useSetRecoilState } from 'recoil';

import { useCaseSetApi } from '@/common/api/hooks/useCaseSetApi';
import { TablesBox, SubTablesBox, JSONDataBox } from '@/components';
import { CaseSetBox } from '@/containers/CaseSet/style';
import { CaseJson } from '@/containers/CaseSet/Table/CaseJson';
import { CaseSetTable } from '@/containers/CaseSet/Table/CaseSetTable';
import { CaseTable } from '@/containers/CaseSet/Table/CaseTable';
import { ExpectedResultJson } from '@/containers/CaseSet/Table/ExpectedResultJson';
import { ExpectedResultTable } from '@/containers/CaseSet/Table/ExpectedResultTable';
import { caseSetsAtom } from '@/recoil/status';
import { ErrorFallback } from '@components';

const CaseSetPage = () => {
  const caseSetApi = useCaseSetApi();
  const setCaseSets = useSetRecoilState(caseSetsAtom);

  useEffect(() => {
    if (!caseSetApi) return;
    const getCaseSets = async () => {
      const response = await caseSetApi.getCaseSets();
      if (response) {
        setCaseSets(response);
      }
    };
    getCaseSets();
  }, [caseSetApi]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CaseSetBox>
        <TablesBox>
          <CaseSetTable />
          <SubTablesBox>
            <CaseTable />
            <ExpectedResultTable />
          </SubTablesBox>
          <JSONDataBox>
            <CaseJson />
            <ExpectedResultJson />
          </JSONDataBox>
        </TablesBox>
      </CaseSetBox>
    </ErrorBoundary>
  );
};

export default CaseSetPage;
