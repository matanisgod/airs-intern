import { atom } from 'recoil';

import type { ExecutionLogs } from './interface';

export const executionAtom = atom<ExecutionLogs>({
  key: 'executionAtom',
  default: [],
});

export const executionDialogIsOpenAtom = atom<boolean>({
  key: 'executionDialogIsOpenAtom',
  default: false,
});
