import React from 'react';

import ReactJson from 'react-json-view';
import { useRecoilValue } from 'recoil';

import { JSONDataBoxTop, TableDataBox, TableHeaderBox, customTheme } from '@/components';
import { jsonTopAtom } from '@/recoil/status';

export const CaseJson = () => {
  const jsonData = useRecoilValue(jsonTopAtom);

  return (
    <JSONDataBoxTop>
      <TableHeaderBox>Case data</TableHeaderBox>
      <TableDataBox>
        {Object.keys(jsonData).length > 0 && (
          <ReactJson
            src={jsonData}
            name={false}
            collapsed={false}
            iconStyle="triangle"
            displayDataTypes={false}
            displayObjectSize={false}
            enableClipboard={false}
            quotesOnKeys={false}
            theme={customTheme}
          />
        )}
      </TableDataBox>
    </JSONDataBoxTop>
  );
};
