import React, { useState } from 'react';

import {
  DialogContent,
  DialogContentText,
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
  CreateExecutionButton,
  CreateExecutionDialogTitle,
  CancelSubmitButton,
  TestSetsMenu,
  TestSetsText,
  ExecutionBox,
  CreateExecutionDialog,
} from './style';
import { ExecutionForm, formField } from './util';

import { useCaseSetApi } from '@/common/api/hooks/useCaseSetApi';
import { caseSetAtom } from '@/recoil/status';
import { PageButton } from '@components';

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
        <PageButton onClick={() => navi('/caseset')}>move to caseset</PageButton>
        <CreateExecutionButton onClick={handleOpen}>
          Create Execution
        </CreateExecutionButton>
        <CreateExecutionDialog open={open} onClose={handleClose} disableRestoreFocus>
          <CreateExecutionDialogTitle>Create Execution</CreateExecutionDialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogContentText>test sets: </DialogContentText>
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
                      <DialogContentText>{fieldState.error.message}</DialogContentText>
                    )}
                  </FormControl>
                )}
              />
              {formField.map(({ label, name, type }) => (
                <Box key={name}>
                  <DialogContentText>{label}: </DialogContentText>
                  <Controller
                    name={name as keyof ExecutionForm}
                    control={control}
                    defaultValue={''}
                    rules={{ required: '필수 입력' }}
                    render={({ field, fieldState }) => (
                      <FormControl fullWidth>
                        <OutlinedInput {...field} type={type} autoComplete="off" />
                        {fieldState.error && (
                          <DialogContentText>
                            {fieldState.error.message}
                          </DialogContentText>
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
        </CreateExecutionDialog>
      </ExecutionBox>
    </React.Fragment>
  );
};

export default Execution;
