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

interface formFieldInterface {
  label: string;
  name: keyof ExecutionForm;
  type: 'text' | 'number';
}

export const formField: formFieldInterface[] = [
  { label: 'Test performer', name: 'testPerformer', type: 'text' },
  { label: 'Gate pc ip', name: 'gatePcIp', type: 'text' },
  { label: 'DCS api port', name: 'dcsApiPort', type: 'number' },
  { label: 'DCS dicom port', name: 'dcsDicomPort', type: 'number' },
  { label: 'Hospital realm', name: 'hospitalRealm', type: 'text' },
  { label: 'Keycloak url', name: 'keycloakUrl', type: 'text' },
  { label: 'Keycloak login id', name: 'keycloakLoginId', type: 'text' },
  { label: 'Keycloak login pw', name: 'keycloakLoginPw', type: 'text' },
];
