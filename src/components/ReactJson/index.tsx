import React from 'react';

import ReactJson, { ReactJsonViewProps } from 'react-json-view';

interface CustomReactJsonViewProps extends ReactJsonViewProps {
  displayArrayKey?: boolean;
}

export const CustomReactJson = (props: CustomReactJsonViewProps) => {
  return <ReactJson {...props} />;
};

export const customTheme = {
  base00: '#1e1e1e !important',
  base01: '#252930',
  base02: '#ffffff',
  base03: '#5c6370',
  base04: '#b0b8c0',
  base05: '#7eca9c',
  base06: '#e06c75',
  base07: '#ffffff',
  base08: '#56b6c2',
  base09: '#e5a074',
  base0A: '#000000',
  base0B: '#61afef',
  base0C: '#c678dd',
  base0D: '#56b6c2',
  base0E: '#f06292',
  base0F: '#ffca28',
};
