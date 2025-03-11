import React from 'react';

import _ from 'lodash';
import ReactJson from 'react-json-view';
import { useRecoilValue } from 'recoil';

import {
  JSONDataBoxTop,
  TableDataBox,
  TableHeaderBox,
  customTheme,
  JSONDefaultBox,
} from '@components';
import { caseJsonAtom } from '@recoil/status';

export const CaseJsonLoader = () => {
  const caseJson = useRecoilValue(caseJsonAtom);

  return (
    <JSONDataBoxTop>
      <TableHeaderBox>Case data</TableHeaderBox>
      <TableDataBox>
        {_.isEmpty(caseJson) && <JSONDefaultBox>Select case</JSONDefaultBox>}

        {!_.isEmpty(caseJson) && (
          <ReactJson
            src={caseJson}
            name={false}
            collapsed={false}
            iconStyle="triangle"
            displayDataTypes={false}
            displayObjectSize={false}
            enableClipboard={false}
            quotesOnKeys={false}
            theme={customTheme}
            displayArrayKey={false}
          />
        )}
      </TableDataBox>
    </JSONDataBoxTop>
  );
};
