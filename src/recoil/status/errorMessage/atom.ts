import { atom } from 'recoil';

import type { errorMessage } from './interface';

export const errorMessageAtom = atom<errorMessage>({
  key: 'errorMessageAtom',
  default: { errorStatus: '', errorStatusText: '', errorData: '' },
});
