import React, { useEffect } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { useSetRecoilState } from 'recoil';

import { CaseSetBox } from './style';

import { useCaseSetApi } from '@common/api';
import { TablesBox, SubTablesBox, JSONDataBox, ErrorFallback } from '@components';
import {
  CaseSetTable,
  CaseTable,
  ExpectedResultTable,
  CaseJsonLoader,
  CaseExpectedResultJsonLoader,
} from '@containers';
import { caseSetsAtom } from '@recoil/status';

export const CaseSetPage = () => {
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
            <CaseJsonLoader />
            <CaseExpectedResultJsonLoader />
          </JSONDataBox>
        </TablesBox>
      </CaseSetBox>
    </ErrorBoundary>
  );
};
