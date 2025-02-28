import React from 'react';

import { CaseLogTableBox } from '../style';

import { TableHeaderBox, TableDataBox } from '@/components';

export const CaseLogTable = () => {
  return (
    <CaseLogTableBox>
      <TableHeaderBox>Case log</TableHeaderBox>
      <TableDataBox></TableDataBox>
    </CaseLogTableBox>
  );
};
