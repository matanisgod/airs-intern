import React from 'react';

import _ from 'lodash';
import { ErrorBoundary } from 'react-error-boundary';

import { CaseSet } from '@/containers';
import { ErrorFallback } from '@components';

const CaseSetPage: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CaseSet />
    </ErrorBoundary>
  );
};

export default CaseSetPage;
