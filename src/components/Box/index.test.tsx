import React from 'react';

import { render, screen } from '@testing-library/react';

import {
  PageBox,
  SubTablesBox,
  JSONDataBox,
  JSONDataBoxTop,
  JSONDataBoxBot,
  TableHeaderBox,
  TableDataBox,
  DatagridDefaultBox,
  JSONDefaultBox,
  ButtonBox,
  ModalBox,
  ModalContentBox,
} from './index';

describe('Box', () => {
  const boxes = [
    { component: PageBox, label: 'PageBox' },
    { component: SubTablesBox, label: 'SubTablesBox' },
    { component: JSONDataBox, label: 'JSONDataBox' },
    { component: JSONDataBoxTop, label: 'JSONDataBoxTop' },
    { component: JSONDataBoxBot, label: 'JSONDataBoxBot' },
    { component: TableHeaderBox, label: 'TableHeaderBox' },
    { component: TableDataBox, label: 'TableDataBox' },
    { component: DatagridDefaultBox, label: 'DatagridDefaultBox' },
    { component: JSONDefaultBox, label: 'JSONDefaultBox' },
    { component: ButtonBox, label: 'ButtonBox' },
    { component: ModalBox, label: 'ModalBox' },
    { component: ModalContentBox, label: 'ModalContentBox' },
  ];
  it('render', () => {
    boxes.forEach(({ component: Box, label }) => {
      render(<Box>{label}</Box>);
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
