import React from 'react';

import _ from 'lodash';
import { useRecoilValue } from 'recoil';

import {
  customTheme,
  JSONDataBoxTop,
  TableDataBox,
  TableHeaderBox,
  JSONDefaultBox,
} from '@components';
import { CustomReactJson } from '@containers';
import { actualResultJsonAtom } from '@recoil/status';

export const ActualResultJsonLoader = () => {
  const actualResultJson = useRecoilValue(actualResultJsonAtom);

  return (
    <JSONDataBoxTop>
      <TableHeaderBox>Actual result data</TableHeaderBox>
      <TableDataBox>
        {_.isEmpty(actualResultJson) ? (
          <JSONDefaultBox>Select detail</JSONDefaultBox>
        ) : (
          <CustomReactJson
            src={actualResultJson}
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
    </JSONDataBoxTop>
  );
};
