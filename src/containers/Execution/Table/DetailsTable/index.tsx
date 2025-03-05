import React from 'react';

import { DetailsTableBox } from './style';

import { TableHeaderBox, TableDataBox } from '@components';

export const DetailsTable = () => {
  return (
    <DetailsTableBox>
      <TableHeaderBox>Details</TableHeaderBox>
      <TableDataBox></TableDataBox>
    </DetailsTableBox>
  );
};
