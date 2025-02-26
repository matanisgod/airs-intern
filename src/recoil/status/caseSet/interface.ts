export type CaseType = 'study' | 'series' | 'pacs';

interface Case {
  type: string;
  title: string;
  id: string;
  cases: Array<{
    id: string;
    name: string;
    data: object;
  }>;
}

export interface CaseSet {
  message: string;
  data: Array<Case>;
}
interface ER {
  id: string;
  name: string;
  version: string;
  data: object;
}
export interface ExpectedResult {
  message: string;
  data: Array<ER>;
}
