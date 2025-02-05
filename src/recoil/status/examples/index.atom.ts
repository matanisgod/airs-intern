import { atom } from 'recoil';

import { Examples } from './index.interface';

export const examplesAtom = atom<Examples>({
  key: 'examplesAtom',
  default: [],
});
