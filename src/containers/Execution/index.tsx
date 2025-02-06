import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PageButton, ExecutionText } from '@components';
import { ExecutionBox } from './style';
import { useRecoilValue } from 'recoil';
import { executionAtom } from '@/recoil/status';
//TODO: react-hook-form 사용해서 post execution (create execution)에 해당하는 form 받는 dialog 구현
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
