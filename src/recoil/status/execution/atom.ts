import { atom } from 'recoil';

import type { ExecutionLogs, CaseLogs } from './interface';

export const executionLogsAtom = atom<ExecutionLogs>({
  key: 'executionAtom',
  default: [],
});

export const executionDialogIsOpenAtom = atom<boolean>({
  key: 'executionDialogIsOpenAtom',
  default: false,
});

export const caseLogAtom = atom<CaseLogs>({
  key: 'caseLogAtom',
  default: [],
});
