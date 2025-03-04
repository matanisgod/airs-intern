interface Case {
  id: string;
  name: string;
  data: object;
}

export type Cases = Array<Case>;

interface CaseSet {
  type: string;
  title: string;
  id: string;
  cases: Cases;
}

export type CaseSets = Array<CaseSet>;
