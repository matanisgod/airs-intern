import { atom } from 'recoil';

import type { ExpectedResults } from './interface';

export const expectedResultsAtom = atom<ExpectedResults>({
  key: 'expectedResultsAtom',
  default: [],
});
