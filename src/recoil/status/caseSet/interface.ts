export type CaseType = 'study' | 'series' | 'pacs';

export interface Case {
  updatedAt: string;
  type: string;
  title: string;
  id: string;
  createdAt: string;
}

export type CaseSet = Array<Case>;
