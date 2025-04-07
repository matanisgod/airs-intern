import React from 'react';

import _ from 'lodash';
import {
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
  useRecoilState,
} from 'recoil';

import { CaseLogTableBox } from './style';
import { caseLogColumns } from './util';

import { useCaseLogApi } from '@common/api';
import { TableHeaderBox, TableDataBox, DataTable, DatagridDefaultBox } from '@components';
import { DetailsTable } from '@containers';
import {
  actualResultJsonAtom,
  caseLogsAtom,
  idAtom,
  detailsAtom,
  detailsExpectedResultJsonAtom,
} from '@recoil';

export const CaseLogTable = () => {
  const caseLogApi = useCaseLogApi();

  const [caseLogId, setCaseLogId] = useRecoilState(idAtom('caseLogId'));

  const caseLogs = useRecoilValue(caseLogsAtom);
  const executionLogId = useRecoilValue(idAtom('executionLogId'));

  const setDetails = useSetRecoilState(detailsAtom);

  const resetActualResultJson = useResetRecoilState(actualResultJsonAtom);
  const resetDetailsExpectedResultJson = useResetRecoilState(
    detailsExpectedResultJsonAtom,
  );
  const resetCaseLogId = useResetRecoilState(idAtom('caseLogId'));
  const resetDetails = useResetRecoilState(detailsAtom);

  const getDetails = async (
    executionLogId: string,
    caseId: string,
    expectedResultId: string,
  ) => {
    if (!caseLogApi) return;

    const response = await caseLogApi.getDetailsById({
      executionLogId: executionLogId,
      caseId: caseId,
      expectedResultId: expectedResultId,
    });
    if (response) {
      setDetails(response);
    }
  };
  const clearExecutionPage = () => {
    resetActualResultJson();
    resetDetailsExpectedResultJson();
  };

  const DatagridOverlay = () => (
    <DatagridDefaultBox>
      {_.isEmpty(executionLogId) ? 'Select execution log' : 'No case log'}
    </DatagridDefaultBox>
  );

  return (
    <CaseLogTableBox>
      <TableHeaderBox>Case log</TableHeaderBox>
      <TableDataBox>
        <DataTable
          initialState={{
            columns: {
              columnVisibilityModel: {
                __detail_panel_toggle__: false,
              },
            },
          }}
          rows={caseLogs}
          columns={caseLogColumns}
          hideFooter
          disableColumnMenu
          columnHeaderHeight={48}
          rowHeight={48}
          onRowClick={async (params, event) => {
            if (caseLogId === params.row.id && event.ctrlKey) {
              clearExecutionPage();
              resetCaseLogId();
              resetDetails();
            } else if (caseLogId !== params.row.id && event.ctrlKey) {
              return;
            } else if (caseLogId === params.row.id && !event.ctrlKey) {
              return;
            } else {
              await getDetails(
                params.row.executionLogId,
                params.row.caseId,
                params.row.expectedResultId,
              );
              clearExecutionPage();
              setCaseLogId(params.row.id);
            }
          }}
          slots={{
            noRowsOverlay: DatagridOverlay,
          }}
          detailPanelExpandedRowIds={[caseLogId]}
          getDetailPanelContent={() => <DetailsTable />}
          getDetailPanelHeight={() => 'auto'}
          scrollbarSize={8}
        />
      </TableDataBox>
    </CaseLogTableBox>
  );
};
