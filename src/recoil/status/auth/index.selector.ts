import { selector } from 'recoil';

import {
  accessTokenAtom,
  userGroupsAtom,
  isAuthenticatedAtom,
  signinAtom,
  signoutAtom,
  userAtom,
} from './index.atom';
import { AuthState } from './index.interface';

export const authSelector = selector<AuthState>({
  key: 'authSelector',
  get: ({ get }) => {
    return {
      isAuthenticated: get(isAuthenticatedAtom),
      user: get(userAtom),
      accessToken: get(accessTokenAtom),
      signin: get(signinAtom),
      signout: get(signoutAtom),
      userGroups: get(userGroupsAtom),
    };
  },
});
