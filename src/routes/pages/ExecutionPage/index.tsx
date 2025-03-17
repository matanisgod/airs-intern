import React from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { PageBox, SubTablesBox, JSONDataBox, ErrorFallback } from '@components';
import {
  ExecutionLogTable,
  CaseLogTable,
  DetailsTable,
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
          <DetailsTable />
        </SubTablesBox>
        <JSONDataBox>
          <ActualResultJsonLoader />
          <DetailsExpectedResultJsonLoader />
        </JSONDataBox>
      </PageBox>
    </ErrorBoundary>
  );
};
