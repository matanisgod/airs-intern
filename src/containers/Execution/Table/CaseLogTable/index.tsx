import React from 'react';

import {
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
  useRecoilState,
} from 'recoil';

import { CaseLogTableBox } from './style';
import { caseLogColumns } from './util';

import { useCaseLogApi } from '@/common/api';
import { TableHeaderBox, TableDataBox, DataTable, DatagridDefaultBox } from '@components';
import { DetailsTable } from '@containers';
import {
  actualResultJsonAtom,
  caseLogsAtom,
  detailIdAtom,
  detailsAtom,
  detailsExpectedResultJsonAtom,
  isExecutionLogRowClickedAtom,
} from '@recoil/status';

export const CaseLogTable = () => {
  const caseLogApi = useCaseLogApi();

  const caseLogs = useRecoilValue(caseLogsAtom);
  const isExecutionLogRowClicked = useRecoilValue(isExecutionLogRowClickedAtom);

  const setDetails = useSetRecoilState(detailsAtom);

  const resetActualResultJson = useResetRecoilState(actualResultJsonAtom);
  const resetDetailsExpectedResultJson = useResetRecoilState(
    detailsExpectedResultJsonAtom,
  );
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
  const cleanExecutionPage = () => {
    resetActualResultJson();
    resetDetailsExpectedResultJson();
  };

  const DatagridOverlay = () => (
    <DatagridDefaultBox>
      {isExecutionLogRowClicked ? 'No case log' : 'Select execution log'}
    </DatagridDefaultBox>
  );
  const [detailId, setDetailId] = useRecoilState(detailIdAtom);

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
          onRowClick={async (params) => {
            if (detailId === params.row.id) {
              setDetailId('');
            } else {
              cleanExecutionPage();
              await getDetails(
                params.row.executionLogId,
                params.row.caseId,
                params.row.expectedResultId,
              );
              setDetailId(params.row.id);
            }
          }}
          slots={{
            noRowsOverlay: DatagridOverlay,
          }}
          detailPanelExpandedRowIds={[detailId]}
          getDetailPanelContent={() => <DetailsTable />}
          getDetailPanelHeight={() => 'auto'}
          scrollbarSize={8}
        />
      </TableDataBox>
    </CaseLogTableBox>
  );
};
