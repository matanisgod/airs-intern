import React, { PropsWithChildren } from 'react';

type Props = {
  children?: React.ReactNode;
};

export const RecoilHooks: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return <>{children}</>;
};
