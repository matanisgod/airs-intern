import React, { useEffect } from 'react';

import {
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
  useRecoilState,
} from 'recoil';

import { ActionButton, CaseSetTableBox } from './style';
import { caseSetColumns } from './util';

import { useCaseApi, useCaseSetApi } from '@common/api';
import {
  TableHeaderBox,
  TableDataBox,
  DataTable,
  DatagridDefaultBox,
  ButtonBox,
  RefreshButton,
  CreateButton,
} from '@components';
import { CreateCaseSetDialog } from '@containers';
import {
  caseSetsAtom,
  casesAtom,
  caseJsonAtom,
  caseExpectedResultJsonAtom,
  expectedResultsAtom,
  dichotomyAtom,
  idAtom,
} from '@recoil';

export const CaseSetTable = () => {
  const caseApi = useCaseApi();
  const caseSetApi = useCaseSetApi();

  const [isCaseSetDialogOpen, setCaseSetDialogOpen] = useRecoilState(
    dichotomyAtom('isCaseSetDialogOpen'),
  );
  const [caseSetId, setCaseSetId] = useRecoilState(idAtom('caseSetId'));

  const caseSets = useRecoilValue(caseSetsAtom);

  const setCaseSets = useSetRecoilState(caseSetsAtom);
  const setCases = useSetRecoilState(casesAtom);

  const resetExpectedResults = useResetRecoilState(expectedResultsAtom);
  const resetCaseJson = useResetRecoilState(caseJsonAtom);
  const resetCaseExpectedResultJson = useResetRecoilState(caseExpectedResultJsonAtom);
  const resetCaseSetId = useResetRecoilState(idAtom('caseSetId'));
  const resetCases = useResetRecoilState(casesAtom);

  const getCasesByCaseSet = async (params: string) => {
    if (!caseApi) return;
    const response = await caseApi.getCasesByCaseSetId(params);
    if (response) {
      setCases(response);
    }
  };
  const cleanCaseSetPage = () => {
    resetExpectedResults();
    resetCaseJson();
    resetCaseExpectedResultJson();
  };
  const DatagridOverlay = () => <DatagridDefaultBox>No rows</DatagridDefaultBox>;

  useEffect(() => {
    if (!caseSetApi) return;
    const fetchCaseSets = async () => {
      const response = await caseSetApi.getCaseSets();
      if (response) {
        setCaseSets(response);
      }
    };
    fetchCaseSets();
  }, [caseSetApi, setCaseSets]);

  const onCreateButtonClick = () => {
    setCaseSetDialogOpen(true);
  };

  return (
    <CaseSetTableBox>
      <TableHeaderBox>
        Case set
        <ButtonBox>
          <ActionButton
            onClick={async () => {
              const response = await caseSetApi?.getCaseSets();
              if (response) {
                setCaseSets(response);
              }
            }}
          >
            {RefreshButton()}
          </ActionButton>
          <ActionButton onClick={onCreateButtonClick}>{CreateButton()}</ActionButton>
        </ButtonBox>
      </TableHeaderBox>
      <TableDataBox>
        <DataTable
          rows={caseSets}
          columns={caseSetColumns}
          hideFooter
          disableColumnMenu
          columnHeaderHeight={40}
          rowHeight={40}
          onRowClick={async (params, event) => {
            if (caseSetId === params.row.id && event.ctrlKey) {
              cleanCaseSetPage();
              resetCaseSetId();
              resetCases();
            } else if (caseSetId === params.row.id && !event.ctrlKey) {
              return;
            } else {
              await getCasesByCaseSet(params.row.id);
              cleanCaseSetPage();
              setCaseSetId(params.row.id);
            }
          }}
          slots={{
            noRowsOverlay: DatagridOverlay,
          }}
          disableMultipleRowSelection={true}
          disableColumnReorder={true}
          scrollbarSize={8}
        />
      </TableDataBox>
      {/* Dialog */}
      {isCaseSetDialogOpen && <CreateCaseSetDialog />}
    </CaseSetTableBox>
  );
};
