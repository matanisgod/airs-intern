import React from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { PageBox, SubTablesBox, JSONDataBox, ErrorFallback } from '@components';
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
      <PageBox>
        <CaseSetTable />
        <SubTablesBox>
          <CaseTable />
          <ExpectedResultTable />
        </SubTablesBox>
        <JSONDataBox>
          <CaseJsonLoader />
          <CaseExpectedResultJsonLoader />
        </JSONDataBox>
      </PageBox>
    </ErrorBoundary>
  );
};
