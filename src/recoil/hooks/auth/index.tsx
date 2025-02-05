import React, {
  PropsWithChildren,
  useMemo,
  useEffect,
  useCallback,
  useState,
} from 'react';

import { useKeycloak } from '@react-keycloak/web';
import { decode } from 'jsonwebtoken';
import _ from 'lodash';
import { useSetRecoilState } from 'recoil';

import {
  accessTokenAtom,
  isAuthenticatedAtom,
  userAtom,
  signinAtom,
  signoutAtom,
  User,
  DecodedJWTPayload,
  userGroupsAtom,
} from '@recoil/status';

type Props = {
  children?: React.ReactNode;
};

export const AuthHooks: React.FC<PropsWithChildren<Props>> = ({
  children,
}: PropsWithChildren<Props>) => {
  const kc = useKeycloak();

  const setAccessToken = useSetRecoilState(accessTokenAtom);
  const setAuthenticated = useSetRecoilState(isAuthenticatedAtom);
  const setUser = useSetRecoilState(userAtom);
  const setSignin = useSetRecoilState(signinAtom);
  const setSignout = useSetRecoilState(signoutAtom);
  const setUserGroups = useSetRecoilState(userGroupsAtom);

  console.debug('AuthHooks render');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).kc = kc;

  const authenticated = kc.keycloak.authenticated || false;

  const accessToken = useMemo(() => kc.keycloak.token, [kc.keycloak.token]);

  const [updated, setUpdated] = useState<boolean>(false);

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken as string);
    }
  }, [accessToken]);

  kc.keycloak.onAuthRefreshSuccess = useCallback(() => {
    console.debug('custom onAuthRefreshSuccess');
    setUpdated(!updated);
  }, [updated]);

  const user: User | undefined = useMemo(() => {
    console.debug('memo user');
    if (accessToken) {
      const decodedAccessToken = decode(accessToken, {
        json: true,
      });
      if (decodedAccessToken) {
        console.log('user : ', decodedAccessToken);
        return decodedAccessToken as DecodedJWTPayload;
      }
    }
  }, [accessToken]);

  const signin = useCallback(() => {
    console.debug('signin');
    if (kc.initialized && !kc.keycloak.authenticated) {
      kc.keycloak.login({
        redirectUri: window.location.href,
      });
    }
  }, [kc.initialized, kc.keycloak]);

  const signout = useCallback(() => {
    console.debug('signout');
    kc.keycloak.logout({
      redirectUri: window.location.href,
    });
  }, [kc.initialized, kc.keycloak]);

  useEffect(() => {
    setAuthenticated(authenticated);
  }, [authenticated]);

  useEffect(() => {
    setUser(user);
  }, [user]);

  useEffect(() => {
    console.log(
      'Is AIRS :',
      _.some(['/swe', '/service_engineers'], (value) =>
        _.includes(user ? user.groups : [], value),
      ),
    );
    setUserGroups({
      isSwe: _.includes(user ? user.groups : [], '/swe'),
      isServiceEngineeer: _.includes(user ? user.groups : [], '/service_engineers'),
    });
  }, [user]);

  useEffect(() => {
    setSignin(() => signin);
  }, [signin]);

  useEffect(() => {
    setSignout(() => signout);
  }, [signout]);

  return <React.Fragment>{children}</React.Fragment>;
};
