import React from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { Execution } from '@/containers';
import { ErrorFallback } from '@components';

const ExecutionPage: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Execution />
    </ErrorBoundary>
  );
};

export default ExecutionPage;
