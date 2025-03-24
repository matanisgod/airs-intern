import React from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { PageBox, SubTablesBox, JSONDataBox, ErrorFallback } from '@components';
import {
  ExecutionLogTable,
  CaseLogTable,
  ActualResultJsonLoader,
  DetailsExpectedResultJsonLoader,
} from '@containers';

export const ExecutionPage = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PageBox>
        <ExecutionLogTable />
        <SubTablesBox>
          <CaseLogTable />
        </SubTablesBox>
        <JSONDataBox>
          <ActualResultJsonLoader />
          <DetailsExpectedResultJsonLoader />
        </JSONDataBox>
      </PageBox>
    </ErrorBoundary>
  );
};
