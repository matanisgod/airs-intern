import { atom } from 'recoil';

import type { ErrorMessage } from './interface';

export const errorMessageAtom = atom<ErrorMessage>({
  key: 'errorMessageAtom',
  default: { status: undefined, statusText: '' },
});
export const isErrorModalOpenAtom = atom<boolean>({
  key: 'isErrorModalOpenAtom',
  default: false,
});
export const isStopModalOpenAtom = atom<boolean>({
  key: 'isStopModalOpenAtom',
  default: false,
});
export const stopTargetAtom = atom<string>({
  key: 'stopTargetAtom',
  default: '',
});
