import React from 'react';

import ReactJson, { ReactJsonViewProps } from 'react-json-view';

interface CustomReactJsonViewProps extends ReactJsonViewProps {
  displayArrayKey?: boolean;
}

export const CustomReactJson = (props: CustomReactJsonViewProps) => {
  return <ReactJson {...props} />;
};
