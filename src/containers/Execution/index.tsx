import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PageButton, ExecutionText } from '@components';
import { ExecutionBox } from './style';
import { useRecoilValue } from 'recoil';
import { executionAtom } from '@/recoil/status';
const Execution: React.FC = () => {
  const navi = useNavigate();
  return (
    <ExecutionBox>
      <ExecutionText>Execution</ExecutionText>
      <PageButton onClick={() => navi('/caseset')}>move to caseset</PageButton>
    </ExecutionBox>
  );
};

export default Execution;
