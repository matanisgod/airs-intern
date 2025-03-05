import React from 'react';

import { JSONDataBoxBot, TableDataBox, TableHeaderBox } from '@components';

export const DetailsExpectedResultJsonLoader = () => {
  return (
    <JSONDataBoxBot>
      <TableHeaderBox>Expected result data</TableHeaderBox>
      <TableDataBox></TableDataBox>
    </JSONDataBoxBot>
  );
};
