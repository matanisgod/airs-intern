import React, { useEffect } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { useSetRecoilState } from 'recoil';

import { ExecutionBox } from './style';

import { useExecutionApi } from '@common/api';
import { TablesBox, SubTablesBox, JSONDataBox, ErrorFallback } from '@components';
import {
  ExecutionLogTable,
  CaseLogTable,
  DetailsTable,
  ActualResultJsonLoader,
  DetailsExpectedResultJsonLoader,
} from '@containers';
import { executionLogsAtom } from '@recoil/status';

export const ExecutionPage = () => {
  const executionApi = useExecutionApi();
  const setExecutionLog = useSetRecoilState(executionLogsAtom);

  useEffect(() => {
    if (!executionApi) return;
    const getExecutionLog = async () => {
      const response = await executionApi.getExecutionLogs();
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
            <ActualResultJsonLoader />
            <DetailsExpectedResultJsonLoader />
          </JSONDataBox>
        </TablesBox>
      </ExecutionBox>
    </ErrorBoundary>
  );
};
