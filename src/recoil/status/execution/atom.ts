import { atom } from 'recoil';

import type { ExecutionLogs } from './interface';

export const executionLogsAtom = atom<ExecutionLogs>({
  key: 'executionLogsAtom',
  default: [],
});

export const isExecutionDialogOpenAtom = atom<boolean>({
  key: 'isExecutionDialogOpenAtom',
  default: false,
});

export const isErrorModalOpenAtom = atom<boolean>({
  key: 'isErrorModalOpenAtom',
  default: false,
});

export const executionIdAtom = atom<string>({
  key: 'executionIdAtom',
  default: '',
});
