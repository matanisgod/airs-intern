export type DecodedJWTPayload = {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp?: string;
  session_state?: string;
  acr?: string;
  realm_access?: {
    roles: string[];
  };
  resource_access?: {
    [key: string]: {
      roles: string[];
    };
  };
  scope: string;
  organization?: string;
  email_verified?: boolean;
  name?: string;
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  groups: string[];
  description?: string;
  created_at?: number;
};

export type User = DecodedJWTPayload;

export type UserGroup = {
  isSwe: boolean;
  isServiceEngineeer: boolean;
};

export type AuthState = {
  isAuthenticated: boolean;
  user?: User;
  accessToken?: string;
  signin: () => void;
  signout: () => void;
  userGroups: UserGroup;
};
