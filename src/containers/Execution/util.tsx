export type ExecutionForm = {
  testPerformer: string;
  testSets: [string];
  gatePcIp: string;
  dcsApiPort: number;
  dcsDicomPort: number;
  hospitalRealm: string;
  keycloakUrl: string;
  keycloakLoginId: string;
  keycloakLoginPw: string;
};

export const TestSetsList = [
  'smoke_case',
  'combination_sequences',
  'dispatch_priority',
  'exception',
  'holding_matching',
  'multisource',
  'pixeldata_imagetype',
  'remote_aetitle',
  'retry',
  'series_name',
  'slice_interpolation',
  'store_ordering_customize',
  'swift_matrix_size',
];
