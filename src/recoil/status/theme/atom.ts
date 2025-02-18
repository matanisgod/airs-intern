import { atom } from 'recoil';

import type { CurrentTheme } from './interface';

export const currentThemeAtom = atom<CurrentTheme>({
  key: 'currentThemeAtom',
  default: 'dark',
});
