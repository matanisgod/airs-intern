import { atom } from 'recoil';

export type StatusType = 'running' | 'canceled' | 'error' | 'done';

//TODO: change types
export interface Execution {
  performer: string;
  created_at: string;
  updated_at: string;
  status: StatusType;
}
export type ExecutionLog = Array<Execution>;

export const executionAtom = atom<ExecutionLog>({
  key: 'executionAtom',
  default: [],
});
