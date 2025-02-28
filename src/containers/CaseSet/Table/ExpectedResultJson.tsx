import React from 'react';

import ReactJson from 'react-json-view';
import { useRecoilValue } from 'recoil';

import { customTheme } from '../util';

import { JSONDataBoxBot, TableHeaderBox, TableDataBox } from '@/components';
import { jsonBotAtom } from '@/recoil/status';

export const ExpectedResultJson = () => {
  const jsonData = useRecoilValue(jsonBotAtom);
  return (
    <JSONDataBoxBot>
      <TableHeaderBox>Expected result data</TableHeaderBox>
      <TableDataBox>
        {Object.keys(jsonData).length > 0 && (
          <ReactJson
            src={jsonData}
            theme={customTheme}
            name={false}
            collapsed={false}
            iconStyle="triangle"
            displayDataTypes={false}
            displayObjectSize={false}
            enableClipboard={false}
            quotesOnKeys={false}
          />
        )}
      </TableDataBox>
    </JSONDataBoxBot>
  );
};
