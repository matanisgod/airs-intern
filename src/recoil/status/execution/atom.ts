import { atom } from 'recoil';

import type { ExecutionLogs } from './interface';

export const executionLogsAtom = atom<ExecutionLogs>({
  key: 'executionAtom',
  default: { message: '', data: [] },
});

export const executionDialogIsOpenAtom = atom<boolean>({
  key: 'executionDialogIsOpenAtom',
  default: false,
});
