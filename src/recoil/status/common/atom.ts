import { atom, atomFamily } from 'recoil';

import type { ErrorMessage } from './interface';

export const errorMessageAtom = atom<ErrorMessage>({
  key: 'errorMessageAtom',
  default: { status: undefined, statusText: '' },
});

export const stopTargetAtom = atom<string>({
  key: 'stopTargetAtom',
  default: '',
});

export const dichotomyAtom = atomFamily<boolean, KeyType>({
  key: 'dichotomyAtom',
  default: false,
});

export const idAtom = atomFamily<string, IdType>({
  key: 'idAtom',
  default: '',
});

type KeyType =
  | 'isCaseSetDialogOpen'
  | 'isErrorModalOpen'
  | 'isStopModalOpen'
  | 'isExecutionLogDialogOpen';

type IdType =
  | 'executionLogId'
  | 'caseLogId'
  | 'detailId'
  | 'caseSetId'
  | 'caseId'
  | 'expectedResultId';
