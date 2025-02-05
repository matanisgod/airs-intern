import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PageButton, CaseSetText } from '@components';
import { CaseSetBox } from './style';
import { useRecoilValue } from 'recoil';

const CaseSet: React.FC = () => {
  const navi = useNavigate();
  return (
    //TODO: api 보내기
    <CaseSetBox>
      <CaseSetText>Caseset</CaseSetText>
      <PageButton onClick={() => navi('/execution')}>move to execution</PageButton>
    </CaseSetBox>
  );
};

export default CaseSet;
