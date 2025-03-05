import { atom } from 'recoil';

import type { CaseLogs } from './interface';

export const caseLogsAtom = atom<CaseLogs>({
  key: 'caseLogsAtom',
  default: [],
});
