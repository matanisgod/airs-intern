import { atom } from 'recoil';

import { CurrentTheme } from './interface';

export const currentThemeAtom = atom<CurrentTheme>({
  key: 'currentThemeAtom',
  default: 'dark',
});
