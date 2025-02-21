export type CaseType = 'study' | 'series' | 'pacs';

export interface Case {
  updatedAt: string;
  type: string;
  title: string;
  id: string;
  createdAt: string;
  Cases: Array<{ id: string; name: string }>;
}

export interface CaseSet {
  message: string;
  data: Array<Case>;
}

//TODO:
// response data: { message: 'ExpectedResults retrieved successfully',
//   data: [ null ] }
export interface ExpectedResult {
  message: string;
  data: Array<Case>;
}
