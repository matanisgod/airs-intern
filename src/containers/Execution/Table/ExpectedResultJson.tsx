import React from 'react';

import { JSONDataBoxBot, TableDataBox, TableHeaderBox } from '@/components';

export const ExpectedResultJson = () => {
  return (
    <JSONDataBoxBot>
      <TableHeaderBox>Expected result data</TableHeaderBox>
      <TableDataBox></TableDataBox>
    </JSONDataBoxBot>
  );
};
