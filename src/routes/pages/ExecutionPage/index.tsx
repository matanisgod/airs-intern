import React from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { ExecutionBox } from './style';

import { TablesBox, SubTablesBox, JSONDataBox, ErrorFallback } from '@components';
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
      <ExecutionBox>
        <TablesBox>
          <ExecutionLogTable />
          <SubTablesBox>
            <CaseLogTable />
            <DetailsTable />
          </SubTablesBox>
          <JSONDataBox>
            <ActualResultJsonLoader />
            <DetailsExpectedResultJsonLoader />
          </JSONDataBox>
        </TablesBox>
      </ExecutionBox>
    </ErrorBoundary>
  );
};
