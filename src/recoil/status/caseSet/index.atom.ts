import { atom } from 'recoil';

export interface CaseSet {}
export type CaseSets = Array<CaseSet>;

export const caseSetAtom = atom<CaseSets>({
  key: 'caseSetAtom',
  default: [],
});
