import React from 'react';

import _ from 'lodash';
import { useRecoilValue } from 'recoil';

import {
  JSONDataBoxBot,
  TableHeaderBox,
  TableDataBox,
  customTheme,
  JSONDefaultBox,
  CustomReactJson,
} from '@components';
import { caseExpectedResultJsonAtom } from '@recoil';

export const CaseExpectedResultJsonLoader = () => {
  const caseExpectedResultJson = useRecoilValue(caseExpectedResultJsonAtom);

  return (
    <JSONDataBoxBot>
      <TableHeaderBox>Expected result data</TableHeaderBox>
      <TableDataBox>
        {_.isEmpty(caseExpectedResultJson) ? (
          <JSONDefaultBox>Select expected result</JSONDefaultBox>
        ) : (
          <CustomReactJson
            src={caseExpectedResultJson}
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
