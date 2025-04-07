import React from 'react';

import _ from 'lodash';
import { useRecoilValue } from 'recoil';

import {
  customTheme,
  JSONDataBoxBot,
  TableDataBox,
  TableHeaderBox,
  JSONDefaultBox,
  CustomReactJson,
} from '@components';
import { detailsExpectedResultJsonAtom } from '@recoil';

export const DetailsExpectedResultJsonLoader = () => {
  const detailsExpectedResultJson = useRecoilValue(detailsExpectedResultJsonAtom);

  return (
    <JSONDataBoxBot>
      <TableHeaderBox>Expected result data</TableHeaderBox>
      <TableDataBox>
        {_.isEmpty(detailsExpectedResultJson) ? (
          <JSONDefaultBox>Select detail</JSONDefaultBox>
        ) : (
          <CustomReactJson
            src={detailsExpectedResultJson}
            theme={customTheme}
            name={false}
            collapsed={false}
            iconStyle="triangle"
            displayDataTypes={false}
            displayObjectSize={false}
            enableClipboard={false}
            quotesOnKeys={false}
            displayArrayKey={false}
          />
        )}
      </TableDataBox>
    </JSONDataBoxBot>
  );
};
