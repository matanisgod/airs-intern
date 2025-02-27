//TODO: expected result table row 클릭하면 얘 나와야 함
import React from 'react';

import ReactJson from 'react-json-view';
import { useRecoilValue } from 'recoil';

import { JSONDataBoxBot } from '@/components';
import { jsonBotAtom } from '@/recoil/status';

export const ExpectedResultJson = () => {
  const jsonData = useRecoilValue(jsonBotAtom);
  return (
    <JSONDataBoxBot>
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
    </JSONDataBoxBot>
  );
};
