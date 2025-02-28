import React, { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import { ExecutionBox } from './style';
import { ActualResultJson } from './Table/ActualResultJson';
import { CaseLogTable } from './Table/CaseLogTable';
import { DetailsTable } from './Table/DetailsTable';
import { ExecutionLogTable } from './Table/ExecutionLogTable';
import { ExpectedResultJson } from './Table/ExpectedResultJson';

import { useExecutionApi } from '@/common/api/hooks/useExecutionApi';
import { executionLogsAtom } from '@/recoil/status';
import { TablesBox, SubTablesBox, JSONDataBox } from '@components';

const Execution = () => {
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
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Execution;
{
  /* <React.Fragment>
  <CaseSetBox>
    <TablesBox>
      <CaseSetTable />
      <CaseSetSubTablesBox>
        <CaseTable />
        <ExpectedResultTable />
      </CaseSetSubTablesBox>
      <JSONDataBox>
        <CaseJson />
        <ExpectedResultJson />
      </JSONDataBox>
    </TablesBox>
  </CaseSetBox>
</React.Fragment>; */
}
