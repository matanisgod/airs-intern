import { atom } from 'recoil';

import type { CaseSet } from './interface';

export const caseSetAtom = atom<CaseSet>({
  key: 'caseSetAtom',
  default: [],
});
