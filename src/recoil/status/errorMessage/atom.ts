import { atom } from 'recoil';

import type { ErrorMessage } from './interface';

export const errorMessageAtom = atom<ErrorMessage>({
  key: 'errorMessageAtom',
  default: { errorStatus: '', errorStatusText: '', errorData: { detail: '' } },
});
