import { atom } from 'recoil';

import type { ExecutionLogs } from './interface';

export const executionLogsAtom = atom<ExecutionLogs>({
  key: 'executionLogsAtom',
  default: [],
});

export const isExecutionLogDialogOpenAtom = atom<boolean>({
  key: 'isExecutionLogDialogOpenAtom',
  default: false,
});

export const isExecutionLogRowClickedAtom = atom<boolean>({
  key: 'isExecutionLogRowClickedAtom',
  default: false,
});
