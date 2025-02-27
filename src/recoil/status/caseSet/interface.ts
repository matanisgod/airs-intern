export interface Cases {
  message: string;
  data: Array<Case>;
}

export interface Case {
  id: string;
  name: string;
  data: object;
}

export interface CaseSet {
  type: string;
  title: string;
  id: string;
  cases: Array<Case>;
}

export interface CaseSets {
  message: string;
  data: Array<CaseSet>;
}
