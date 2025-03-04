import React, { useEffect } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { useSetRecoilState } from 'recoil';

import { useExecutionApi } from '@/common/api/hooks/useExecutionApi';
import { ExecutionBox } from '@/containers/Execution/style';
import { ActualResultJson } from '@/containers/Execution/Table/ActualResultJson';
import { CaseLogTable } from '@/containers/Execution/Table/CaseLogTable';
import { DetailsTable } from '@/containers/Execution/Table/DetailsTable';
import { ExecutionLogTable } from '@/containers/Execution/Table/ExecutionLogTable';
import { ExpectedResultJson } from '@/containers/Execution/Table/ExpectedResultJson';
import { executionLogsAtom } from '@/recoil/status';
import { TablesBox, SubTablesBox, JSONDataBox } from '@components';
import { ErrorFallback } from '@components';

const ExecutionPage: React.FC = () => {
  const executionApi = useExecutionApi();
  const setExecutionLog = useSetRecoilState(executionLogsAtom);

  useEffect(() => {
    if (!executionApi) return;
    const getExecutionLog = async () => {
      const response = await executionApi.getExecutionLog();
      if (response) {
        setExecutionLog(response);
      }
    };
    getExecutionLog();
  }, [executionApi]);

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
            <ActualResultJson />
            <ExpectedResultJson />
          </JSONDataBox>
        </TablesBox>
      </ExecutionBox>
    </ErrorBoundary>
  );
};

export default ExecutionPage;
