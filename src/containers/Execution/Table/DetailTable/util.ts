import { GridColDef } from '@mui/x-data-grid';
import clsx from 'clsx';

export const detailColumns: Array<GridColDef> = [
  {
    field: 'checkType',
    headerName: 'Check type',
    flex: 0.6,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'resultLog',
    headerName: 'Result log',
    flex: 0.6,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return params.row.result === 'True' ? '-' : params.row.resultLog;
    },
  },
  {
    field: 'result',
    headerName: 'Result',
    flex: 0.2,
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
