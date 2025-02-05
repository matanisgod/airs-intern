import { atom } from 'recoil';

export interface Execution {}
export type Executions = Array<Execution>;

export const executionAtom = atom<Executions>({
  key: 'caseSetAtom',
  default: [],
});
