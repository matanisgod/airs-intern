import { atom } from 'recoil';

import type { ExpectedResults } from './interface';

export const expectedResultsAtom = atom<ExpectedResults>({
  key: 'expectedResultsAtom',
  default: [],
});
export const caseExpectedResultJsonAtom = atom<object>({
  key: 'caseExpectedResultJsonAtom',
  default: {},
});
