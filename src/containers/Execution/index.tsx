import React from 'react';

import { useNavigate } from 'react-router-dom';
//import { useRecoilValue, useRecoilState } from 'recoil';

import { ExecutionBox } from './style';
//import { executionAtom } from '@/recoil/status';
import { FormDialog } from './util';

import { PageButton } from '@components';

const Execution = () => {
  const navi = useNavigate();
  //const execution = useRecoilValue(executionAtom);
  return (
    <React.Fragment>
      <ExecutionBox>
        <PageButton onClick={() => navi('/caseset')}>move to caseset</PageButton>
      </ExecutionBox>
      <FormDialog />
    </React.Fragment>
  );
};

export default Execution;
