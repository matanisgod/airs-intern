import React from 'react';

import { ReactComponent as AirsLogo } from '@/assets/images/svg/airs_logo.svg';
import { ExampleButton, ExampleText } from '@components';
import { ExampleBox } from './style';
import { useRecoilValue } from 'recoil';
import { authSelector } from '@/recoil/status';

const Example: React.FC = () => {
  const auth = useRecoilValue(authSelector);

  return (
    <ExampleBox>
      <AirsLogo />
      <ExampleText>Hello {auth.user?.given_name}!</ExampleText>
      <ExampleButton onClick={() => auth.signout()}>LogOut</ExampleButton>
    </ExampleBox>
  );
};

export default Example;
