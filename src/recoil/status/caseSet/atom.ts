import { atom } from 'recoil';

import type { CaseSets, Cases } from './interface';

export const caseSetsAtom = atom<CaseSets>({
  key: 'caseSetsAtom',
  default: [],
});

export const casesAtom = atom<Cases>({
  key: 'casesAtom',
  default: [],
});
