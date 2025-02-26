import React from 'react';

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
import { useRecoilState, useRecoilValue } from 'recoil';

import { CancelSubmitButton, TestSetsMenu, TestSetsText, ExecutionBox } from './style';
import { ExecutionForm, formField, ExecutionPageLayout } from './util';

import { caseSetAtom, executionDialogAtom } from '@/recoil/status';
import { CreateDialog, CreateDialogContentText, CreateDialogTitle } from '@components';

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
  const caseSet = useRecoilValue(caseSetAtom);
  const [open, setOpen] = useRecoilState(executionDialogAtom);
  const { control, handleSubmit } = useForm<ExecutionForm>();

  //TODO: reset 왜 안 되는지?
  const handleClose = () => {
    setOpen(false);
  };
  //TODO: post ㄱㄱㄱ
  const onSubmit: SubmitHandler<ExecutionForm> = (data) => {
    console.log(data);
    handleClose();
  };

  const testSetsList = caseSet.data.map((item) => item.title);

  //TODO: open을 dialog 밖으로 뺀다는 게 무슨 뜻인지?
  return (
    <React.Fragment>
      <ExecutionBox>
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
                      {testSetsList?.map((name) => (
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
                    //TODO: why error???
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
        <ExecutionPageLayout />
      </ExecutionBox>
    </React.Fragment>
  );
};

export default Execution;
