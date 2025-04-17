export interface ExecutionForm {
  testSets: Array<string>;
  version: string;
  description: string;
  testPerformer: string;
  gatePcIp: string;
  dcsApiPort: number | undefined;
  dcsDicomPort: number | undefined;
  hospitalRealm: string;
  keycloakUrl: string;
  keycloakLoginId: string;
  keycloakLoginPw: string;
}

interface executionFormFieldInterface {
  label: string;
  name: keyof ExecutionForm;
  type: 'text' | 'number';
}

export const executionFormField: executionFormFieldInterface[] = [
  { label: 'Version', name: 'version', type: 'text' },
  { label: 'Description', name: 'description', type: 'text' },
  { label: 'Test performer', name: 'testPerformer', type: 'text' },
  { label: 'Gate pc ip', name: 'gatePcIp', type: 'text' },
  { label: 'DCS api port', name: 'dcsApiPort', type: 'number' },
  { label: 'DCS dicom port', name: 'dcsDicomPort', type: 'number' },
  { label: 'Hospital realm', name: 'hospitalRealm', type: 'text' },
  { label: 'Keycloak url', name: 'keycloakUrl', type: 'text' },
  { label: 'Keycloak login id', name: 'keycloakLoginId', type: 'text' },
  { label: 'Keycloak login pw', name: 'keycloakLoginPw', type: 'text' },
];
