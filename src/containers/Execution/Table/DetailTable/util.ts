import { GridColDef } from '@mui/x-data-grid';
import clsx from 'clsx';

export const detailColumns: Array<GridColDef> = [
  {
    field: 'resultLog',
    headerName: 'Result log',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'result',
    headerName: 'Result',
    flex: 0.15,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }
      return clsx('resultColor', {
        true: params.value === 'True',
        false: params.value === 'False',
      });
    },
  },
];
