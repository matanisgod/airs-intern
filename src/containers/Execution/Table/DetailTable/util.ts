import { GridColDef } from '@mui/x-data-grid';

export const detailColumns: Array<GridColDef> = [
  {
    field: 'result',
    headerName: 'Result',
    flex: 0.2,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'resultLog',
    headerName: 'Result log',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
];

// export interface JoinedDetail {
//   result: boolean;
//   resultLog: string;
//   actualResult: object;
//   expectedResult: { data: object };
// }
