import { atom } from 'recoil';

import type { Details } from './interface';

export const detailsAtom = atom<Details>({
  key: 'detailsAtom',
  default: [],
});

export const actualResultJsonAtom = atom<object>({
  key: 'actualResultJsonAtom',
  default: {},
});

export const detailsExpectedResultJsonAtom = atom<object>({
  key: 'detailsExpectedResultJsonAtom',
  default: {},
});
