export type ExecutionForm = {
  testPerformer: string;
  test_sets: [string];
  gate_pc_ip: string;
  dcs_api_port: number;
  dcs_dicom_port: number;
  hospital_realm: string;
  keycloak_url: string;
  keycloak_login_id: string;
  keycloak_login_pw: string;
};
