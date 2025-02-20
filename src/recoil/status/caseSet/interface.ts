export type CaseType = 'study' | 'series' | 'pacs';

interface Case {
  updatedAt: string;
  type: string;
  title: string;
  id: string;
  createdAt: string;
  Cases: Array<string>;
}

export type CaseSet = Array<Case>;
