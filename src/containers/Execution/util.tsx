export interface ExecutionForm {
  testPerformer: string;
  testSets: Array<string>;
  gatePcIp: string;
  dcsApiPort: number;
  dcsDicomPort: number;
  hospitalRealm: string;
  keycloakUrl: string;
  keycloakLoginId: string;
  keycloakLoginPw: string;
}

export const formField = [
  { label: 'test performer', name: 'testPerformer', type: 'text' },
  { label: 'gate pc ip', name: 'gatePcIp', type: 'text' },
  { label: 'dcs api port', name: 'dcsApiPort', type: 'number' },
  { label: 'dcs dicom port', name: 'dcsDicomPort', type: 'number' },
  { label: 'hospital realm', name: 'hospitalRealm', type: 'text' },
  { label: 'keycloak url', name: 'keycloakUrl', type: 'text' },
  { label: 'keycloak login id', name: 'keycloakLoginId', type: 'text' },
  { label: 'keycloak login pw', name: 'keycloakLoginPw', type: 'text' },
];
