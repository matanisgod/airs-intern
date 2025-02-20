import React, { useState } from 'react';

import {
  DialogContent,
  DialogActions,
  Box,
  Checkbox,
  FormControl,
  OutlinedInput,
  Select,
} from '@mui/material';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  CancelSubmitButton,
  TestSetsMenu,
  TestSetsText,
  ExecutionBox,
  ExecutionsTableBox,
  CaseLogTableBox,
  DetailsTableBox,
} from './style';
import { ExecutionForm, formField } from './util';

import { useCaseSetApi } from '@/common/api/hooks/useCaseSetApi';
import { caseSetAtom } from '@/recoil/status';
import {
  PageButton,
  TablesBox,
  SubTablesBox,
  CreateButton,
  TableHeaderBox,
  TableDataBox,
  CreateDialog,
  CreateDialogContentText,
  CreateDialogTitle,
} from '@components';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const Execution = () => {
  const navi = useNavigate();
  const caseSetApi = useCaseSetApi();
  const setCaseSet = useSetRecoilState(caseSetAtom);
  const [open, setOpen] = useState<boolean>(false);
  const { control, reset, handleSubmit } = useForm<ExecutionForm>();
  const handleOpen = () => {
    if (!caseSetApi) return;
    const getCaseSet = async () => {
      const response = await caseSetApi.getCaseSet();
      if (response) {
        setCaseSet(response);
      }
    };
    getCaseSet();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    reset();
  };
  const onSubmit: SubmitHandler<ExecutionForm> = (data) => {
    console.log(data);
    handleClose();
  };
  const caseSet = useRecoilValue(caseSetAtom);
  const testSetsList = caseSet.map((item) => item.title);

  return (
    <React.Fragment>
      <ExecutionBox>
        <PageButton onClick={() => navi('/caseset')}>Move to caseset</PageButton>
        <CreateDialog
          open={open}
          onClose={(_, reason) => {
            if (reason === 'backdropClick') return;
            handleClose();
          }}
          disableRestoreFocus
        >
          <CreateDialogTitle>Create execution</CreateDialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CreateDialogContentText>test sets: </CreateDialogContentText>
              <Controller
                name="testSets"
                control={control}
                defaultValue={[]}
                rules={{ required: '필수 입력' }}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth>
                    <Select
                      multiple
                      value={field.value || []}
                      onChange={(event) => {
                        const value =
                          typeof event.target.value === 'string'
                            ? event.target.value.split(',')
                            : event.target.value;
                        field.onChange(value);
                      }}
                      input={<OutlinedInput />}
                      renderValue={(selected) => {
                        if (selected.length > 2) {
                          return `${selected.slice(0, 2).join(', ')}, ...`;
                        }
                        return selected.join(', ');
                      }}
                      MenuProps={MenuProps}
                    >
                      {testSetsList.map((name) => (
                        <TestSetsMenu key={name} value={name}>
                          <Checkbox checked={field.value?.includes(name)} />
                          <TestSetsText primary={name} />
                        </TestSetsMenu>
                      ))}
                    </Select>
                    {fieldState.error && (
                      <CreateDialogContentText>
                        {fieldState.error.message}
                      </CreateDialogContentText>
                    )}
                  </FormControl>
                )}
              />
              {formField.map(({ label, name, type }) => (
                <Box key={name}>
                  <CreateDialogContentText>{label}: </CreateDialogContentText>
                  <Controller
                    name={name as keyof ExecutionForm}
                    control={control}
                    defaultValue={''}
                    rules={{ required: '필수 입력' }}
                    render={({ field, fieldState }) => (
                      <FormControl fullWidth>
                        <OutlinedInput {...field} type={type} autoComplete="off" />
                        {fieldState.error && (
                          <CreateDialogContentText>
                            {fieldState.error.message}
                          </CreateDialogContentText>
                        )}
                      </FormControl>
                    )}
                  />
                </Box>
              ))}
              <DialogActions>
                <CancelSubmitButton
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancel
                </CancelSubmitButton>
                <CancelSubmitButton type="submit">Submit</CancelSubmitButton>
              </DialogActions>
            </form>
          </DialogContent>
        </CreateDialog>
        <TablesBox>
          <ExecutionsTableBox>
            <TableHeaderBox>
              Executions
              <CreateButton onClick={handleOpen}>Create Execution</CreateButton>
            </TableHeaderBox>
            <TableDataBox>
              1. POST executions{'\n'}
              2. POST executions/{'{execution_id}'}:cancel{'\n'}
              3. POST executions:cancel{'\n\n'}
              create 버튼으로 post{'\n'}
              stop 버튼 눌러서 post:cancel by id{'\n'}
              전체 stop 버튼 눌러서 post:cancel{'\n'}
            </TableDataBox>
          </ExecutionsTableBox>
          <SubTablesBox>
            <CaseLogTableBox>
              <TableHeaderBox>Case log</TableHeaderBox>
              <TableDataBox>asdf</TableDataBox>
            </CaseLogTableBox>
            <DetailsTableBox>
              <TableHeaderBox>Details</TableHeaderBox>
              <TableDataBox>zxcv</TableDataBox>
            </DetailsTableBox>
          </SubTablesBox>
        </TablesBox>
      </ExecutionBox>
    </React.Fragment>
  );
};

export default Execution;
