import { atom } from 'recoil';

import type { CaseSets, Cases } from './interface';

export const caseSetsAtom = atom<CaseSets>({
  key: 'caseSetsAtom',
  default: { message: '', data: [] },
});

export const casesAtom = atom<Cases>({
  key: 'caseSetAtom',
  default: { message: '', data: [] },
});
