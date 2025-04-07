import { styled, Box } from '@mui/material';

import { CreateButton } from '@components';

export const CaseSetTableBox = styled(Box)(() => ({
  width: '35%',
  height: '95%',
  display: 'flex',
  alignSelf: 'center',
  flexDirection: 'column',
}));
export const CreateCaseSetButton = styled(CreateButton)(() => ({
  width: '200px',
  height: '50px',
  fontSize: '20px',
}));
