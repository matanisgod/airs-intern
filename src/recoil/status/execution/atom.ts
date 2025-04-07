import { atom } from 'recoil';

import type { ExecutionLogs } from './interface';

export const executionLogsAtom = atom<ExecutionLogs>({
  key: 'executionLogsAtom',
  default: [],
});
