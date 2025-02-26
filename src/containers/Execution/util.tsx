import React from 'react';

import { useSetRecoilState } from 'recoil';

import { ExecutionsTableBox, CaseLogTableBox, DetailsTableBox } from './style';

import { useCaseSetApi } from '@/common/api/hooks/useCaseSetApi';
import { caseSetAtom, executionDialogAtom } from '@/recoil/status';
import {
  TablesBox,
  SubTablesBox,
  CreateButton,
  TableHeaderBox,
  TableDataBox,
  JSONDataBox,
} from '@components';

export interface ExecutionForm {
  testPerformer: string;
  testSets: Array<string>;
  gatePcIp: string;
  dcsApiPort: number;
  dcsDicomPort: number;
  hospitalRealm: string;
  keycloakUrl: string;
  keycloakLoginId: string;
  keycloakLoginPw: string;
}

export const formField: formFieldInterface[] = [
  { label: 'test performer', name: 'testPerformer', type: 'text' },
  { label: 'gate pc ip', name: 'gatePcIp', type: 'text' },
  { label: 'dcs api port', name: 'dcsApiPort', type: 'number' },
  { label: 'dcs dicom port', name: 'dcsDicomPort', type: 'number' },
  { label: 'hospital realm', name: 'hospitalRealm', type: 'text' },
  { label: 'keycloak url', name: 'keycloakUrl', type: 'text' },
  { label: 'keycloak login id', name: 'keycloakLoginId', type: 'text' },
  { label: 'keycloak login pw', name: 'keycloakLoginPw', type: 'text' },
];

interface formFieldInterface {
  label: string;
  name: string;
  type: 'text' | 'number';
}

export const ExecutionPageLayout = () => {
  const caseSetApi = useCaseSetApi();
  const setCaseSet = useSetRecoilState(caseSetAtom);
  const setOpen = useSetRecoilState(executionDialogAtom);

  const handleOpen = () => {
    if (!caseSetApi) return;
    const getCaseSet = async () => {
      const response = await caseSetApi.getCaseSet();
      if (response) {
        setCaseSet(response);
      }
    };
    getCaseSet();
    setOpen(true);
  };
  return (
    <TablesBox>
      <ExecutionsTableBox>
        <TableHeaderBox>
          Executions
          <CreateButton onClick={handleOpen}>Create Execution</CreateButton>
        </TableHeaderBox>
        <TableDataBox>
          1. POST executions{'\n'}
          2. POST executions/{'{execution_id}'}:cancel{'\n'}
          3. POST executions:cancel{'\n\n'}
          create 버튼으로 post{'\n'}
          stop 버튼 눌러서 post:cancel by id{'\n'}
          전체 stop 버튼 눌러서 post:cancel{'\n'}
        </TableDataBox>
      </ExecutionsTableBox>
      <SubTablesBox>
        <CaseLogTableBox>
          <TableHeaderBox>Case log</TableHeaderBox>
          <TableDataBox>asdf</TableDataBox>
        </CaseLogTableBox>
        <DetailsTableBox>
          <TableHeaderBox>Details</TableHeaderBox>
          <TableDataBox>zxcv</TableDataBox>
        </DetailsTableBox>
      </SubTablesBox>
      <JSONDataBox />
    </TablesBox>
  );
};
