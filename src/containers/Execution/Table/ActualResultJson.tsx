import React from 'react';

import { JSONDataBoxTop, TableDataBox, TableHeaderBox } from '@/components';

export const ActualResultJson = () => {
  return (
    <JSONDataBoxTop>
      <TableHeaderBox>Actual result data</TableHeaderBox>
      <TableDataBox></TableDataBox>
    </JSONDataBoxTop>
  );
};
