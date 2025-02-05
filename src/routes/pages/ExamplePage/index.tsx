import React from 'react';

import _ from 'lodash';
import { ErrorBoundary } from 'react-error-boundary';

import { Example } from '@/containers';
import { ErrorFallback } from '@components';

const ExamplePage: React.FC = () => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Example />
        </ErrorBoundary>
    );
};

export default ExamplePage;
