import { atom } from 'recoil';

export * from './theme';
export * from './caseSet';
export * from './execution';
export * from './expectedResult';
export * from './caseLog';
export const jsonTopAtom = atom<object>({
  key: 'jsonTopAtom',
  default: {},
});
export const jsonBotAtom = atom<object>({
  key: 'jsonBotAtom',
  default: {},
});
