import React from 'react';

import _ from 'lodash';
import ReactJson from 'react-json-view';
import { useRecoilValue } from 'recoil';

import { customTheme, JSONDataBoxTop, TableDataBox, TableHeaderBox } from '@components';
import { actualResultJsonAtom } from '@recoil/status';

export const ActualResultJsonLoader = () => {
  const actualResultJson = useRecoilValue(actualResultJsonAtom);
  return (
    <JSONDataBoxTop>
      <TableHeaderBox>Actual result data</TableHeaderBox>
      <TableDataBox>
        {!_.isEmpty(actualResultJson) && (
          <ReactJson
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
