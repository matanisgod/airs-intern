import { atom } from 'recoil';

import { CurrentTheme } from './index.interface';

export const currentThemeAtom = atom<CurrentTheme>({
  key: 'currentThemeAtom',
  default: 'dark',
});
