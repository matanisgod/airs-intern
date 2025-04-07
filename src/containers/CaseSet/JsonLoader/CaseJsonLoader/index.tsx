import React from 'react';

import _ from 'lodash';
import { useRecoilValue } from 'recoil';

import {
  JSONDataBoxTop,
  TableDataBox,
  TableHeaderBox,
  customTheme,
  JSONDefaultBox,
  CustomReactJson,
} from '@components';
import { caseJsonAtom } from '@recoil';

export const CaseJsonLoader = () => {
  const caseJson = useRecoilValue(caseJsonAtom);

  return (
    <JSONDataBoxTop>
      <TableHeaderBox>Case data</TableHeaderBox>
      <TableDataBox>
        {_.isEmpty(caseJson) ? (
          <JSONDefaultBox>Select case</JSONDefaultBox>
        ) : (
          <CustomReactJson
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
