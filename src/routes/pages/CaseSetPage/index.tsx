import React from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { CaseSet } from '@/containers';
import { ErrorFallback } from '@components';

const CaseSetPage = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CaseSet />
    </ErrorBoundary>
  );
};

export default CaseSetPage;
