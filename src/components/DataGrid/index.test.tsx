import React from 'react';

import type { GridColDef } from '@mui/x-data-grid-pro';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { DataTable } from './index';

describe('DataTable', () => {
  it('render', () => {
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'name', headerName: 'Name', width: 200 },
    ];

    const rows = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ];

    render(
      <RecoilRoot>
        <div style={{ height: 300, width: '100%' }}>
          <DataTable columns={columns} rows={rows} />
        </div>
      </RecoilRoot>,
    );

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });
});
