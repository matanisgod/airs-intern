//TODO: case table row 클릭하면 얘 나와야 함
import React from 'react';

import ReactJson from 'react-json-view';
import { useRecoilValue } from 'recoil';

import { JSONDataBoxTop } from '@/components';
import { jsonTopAtom } from '@/recoil/status';

export const CaseJson = () => {
  const jsonData = useRecoilValue(jsonTopAtom);
  return (
    <JSONDataBoxTop>
      {Object.keys(jsonData).length > 0 && (
        <ReactJson
          src={jsonData}
          name={false}
          theme="monokai"
          collapsed={4}
          iconStyle="triangle"
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
          quotesOnKeys={false}
        />
      )}
    </JSONDataBoxTop>
  );
};
