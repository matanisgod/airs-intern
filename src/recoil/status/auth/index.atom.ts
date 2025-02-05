import _ from 'lodash';
import { atom } from 'recoil';

import { User, UserGroup } from './index.interface';

export const accessTokenAtom = atom<string | undefined>({
  key: 'accessTokenAtom',
  default: undefined,
});

export const isAuthenticatedAtom = atom<boolean>({
  key: 'isAuthenticatedAtom',
  default: false,
});

export const userAtom = atom<User | undefined>({
  key: 'userAtom',
  default: undefined,
});

export const signinAtom = atom<() => void>({
  key: 'signinAtom',
  default: _.noop,
});

export const signoutAtom = atom<() => void>({
  key: 'signoutAtom',
  default: _.noop,
});

export const userGroupsAtom = atom<UserGroup>({
  key: 'userGroupsAtom',
  default: { isSwe: false, isServiceEngineeer: false },
});
