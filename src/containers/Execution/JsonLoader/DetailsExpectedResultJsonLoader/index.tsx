import React from 'react';

import _ from 'lodash';
import ReactJson from 'react-json-view';
import { useRecoilValue } from 'recoil';

import { customTheme, JSONDataBoxBot, TableDataBox, TableHeaderBox } from '@components';
import { detailsExpectedResultJsonAtom } from '@recoil/status';

export const DetailsExpectedResultJsonLoader = () => {
  const detailsExpectedResultJson = useRecoilValue(detailsExpectedResultJsonAtom);
  return (
    <JSONDataBoxBot>
      <TableHeaderBox>Expected result data</TableHeaderBox>
      <TableDataBox>
        {!_.isEmpty(detailsExpectedResultJson) && (
          <ReactJson
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
