import React from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '@components';
import { Execution } from '@containers';

const ExecutionPage: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Execution />
    </ErrorBoundary>
  );
};

export default ExecutionPage;
