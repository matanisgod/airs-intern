import React from 'react';

import { render, screen } from '@testing-library/react';

import {
  CreateDialog,
  CreateDialogCheckbox,
  CreateDialogContent,
  CreateDialogContentText,
  CreateDialogFormControl,
  CreateDialogMenuItem,
  CreateDialogTitle,
} from './index';

describe('Dialog', () => {
  it('CreateDialog', () => {
    render(
      <CreateDialog open={true}>
        <CreateDialogTitle>title</CreateDialogTitle>
        <CreateDialogContent>
          <CreateDialogContentText>contentText</CreateDialogContentText>
          <CreateDialogFormControl>
            <CreateDialogMenuItem value="menuItem">menuItem</CreateDialogMenuItem>
            <CreateDialogCheckbox />
          </CreateDialogFormControl>
        </CreateDialogContent>
      </CreateDialog>,
    );
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('contentText')).toBeInTheDocument();
    expect(screen.getByText('menuItem')).toBeInTheDocument();
  });
});
