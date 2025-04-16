export interface Case {
  id: string;
  name: string;
  data: string;
}

export type Cases = Array<Case>;

export interface CaseSet {
  type: string;
  title: string;
  id: string;
  cases: Cases;
}

export type CaseSets = Array<CaseSet>;
