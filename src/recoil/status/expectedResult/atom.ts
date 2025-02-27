import { atom } from 'recoil';

import type { ExpectedResults } from './interface';

export const expectedResultAtom = atom<ExpectedResults>({
  key: 'expectedResultAtom',
  default: { message: '', data: [] },
});
