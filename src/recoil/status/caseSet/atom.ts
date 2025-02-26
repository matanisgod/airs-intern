import { atom } from 'recoil';

import type { CaseSet, ExpectedResult } from './interface';

export const caseSetAtom = atom<CaseSet>({
  key: 'caseSetAtom',
  default: { message: '', data: [] },
});
export const expectedResultAtom = atom<ExpectedResult>({
  key: 'expectedResultAtom',
  default: { message: '', data: [] },
});
