import React from 'react';

import {
  DialogContent,
  DialogActions,
  Box,
  Checkbox,
  FormControl,
  OutlinedInput,
  Select,
  ListItemText,
  MenuItem,
  styled,
} from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { ExecutionForm, formField } from './util';

import { useExecutionApi } from '@common/api';
import { CreateDialogContentText, CancelSubmitButton, MenuProps } from '@components';
import {
  caseSetsAtom,
  isExecutionDialogOpenAtom,
  isErrorModalOpenAtom,
  executionLogsAtom,
} from '@recoil/status';

export const CreateExecutionDialog = () => {
  const executionApi = useExecutionApi();

  const { control, handleSubmit } = useForm<ExecutionForm>();
  const caseSet = useRecoilValue(caseSetsAtom);
  const setExecutionLogs = useSetRecoilState(executionLogsAtom);
  const setErrorModalOpen = useSetRecoilState(isErrorModalOpenAtom);
  const setOpen = useSetRecoilState(isExecutionDialogOpenAtom);

  const testSetsList = caseSet.map((item) => item.title);

  const handleClose = () => {
    setOpen(false);
  };
  const fetchExecution = async (body: ExecutionForm) => {
    if (!executionApi) return;
    const response = await executionApi.createExecution(body);
    if (response) {
      setExecutionLogs((executionLogs) => [...executionLogs, response]);
      handleClose();
    } else {
      setErrorModalOpen(true);
    }
  };
  const onSubmit: SubmitHandler<ExecutionForm> = (data) => {
    fetchExecution(data);
  };

  const TestSetsMenu = styled(MenuItem)(() => ({}));

  const TestSetsText = styled(ListItemText)(() => ({}));
  return (
    <DialogContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CreateDialogContentText>Test sets: </CreateDialogContentText>
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
              name={name}
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
  );
};
