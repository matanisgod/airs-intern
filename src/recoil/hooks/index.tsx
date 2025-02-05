import React, { PropsWithChildren } from 'react';

import { AuthHooks } from './auth';

type Props = {
  children?: React.ReactNode;
};

export const RecoilHooks: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return <AuthHooks>{children}</AuthHooks>;
};
