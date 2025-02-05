import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: process.env.KEYCLOAK_URI,
  realm: process.env.KEYCLOAK_REALM || 'airs',
  clientId: process.env.KEYCLOAK_CLIENT || 'collector',
});

export { keycloak };
