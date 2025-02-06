import { atom } from 'recoil';

export type CaseType = 'study' | 'series' | 'pacs';

//TODO: change interface
export interface Case {
  updated_at: string;
  type: string;
  title: string;
  id: string;
  created_at: string;
  Cases: [Object];
}
export type CaseSet = Array<Case>;

export const caseSetAtom = atom<CaseSet>({
  key: 'caseSetAtom',
  default: [],
});
