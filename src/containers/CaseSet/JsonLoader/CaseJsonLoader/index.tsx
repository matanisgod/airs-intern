import React from 'react';

import _ from 'lodash';
import ReactJson from 'react-json-view';
import { useRecoilValue } from 'recoil';

import { JSONDataBoxTop, TableDataBox, TableHeaderBox, customTheme } from '@components';
import { jsonTopAtom } from '@recoil/status';

export const CaseJsonLoader = () => {
  const jsonTop = useRecoilValue(jsonTopAtom);

  return (
    <JSONDataBoxTop>
      <TableHeaderBox>Case data</TableHeaderBox>
      <TableDataBox>
        {!_.isEmpty(jsonTop) && (
          <ReactJson
            src={jsonTop}
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
