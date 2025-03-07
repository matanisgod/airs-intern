import React from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { CaseSetBox } from './style';

import { TablesBox, SubTablesBox, JSONDataBox, ErrorFallback } from '@components';
import {
  CaseSetTable,
  CaseTable,
  ExpectedResultTable,
  CaseJsonLoader,
  CaseExpectedResultJsonLoader,
} from '@containers';

export const CaseSetPage = () => {
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
