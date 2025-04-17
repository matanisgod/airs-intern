import React from 'react';

import { DialogActions, Box, OutlinedInput, Select, ListItemText } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import validator from 'validator';

import { ExecutionDecisionButton } from './style';
import { ExecutionForm, executionFormField } from './util';

import { useExecutionApi } from '@common/api';
import {
  CreateDialogContentText,
  MenuProps,
  CreateDialog,
  CreateDialogTitle,
  CreateDialogContent,
  CreateDialogFormControl,
  CreateDialogCheckbox,
  CreateDialogMenuItem,
  StyledForm,
} from '@components';
import { caseSetsAtom, executionLogsAtom, dichotomyAtom } from '@recoil';

export * from './util';

export const CreateExecutionDialog = () => {
  const executionApi = useExecutionApi();

  const caseSets = useRecoilValue(caseSetsAtom);
  const [isOpen, setIsOpen] = useRecoilState(dichotomyAtom('isExecutionLogDialogOpen'));

  const setExecutionLogs = useSetRecoilState(executionLogsAtom);

  const { control, handleSubmit } = useForm<ExecutionForm>({
    defaultValues: {
      testSets: [],
      version: '',
      description: '',
      testPerformer: '',
      gatePcIp: '',
      dcsApiPort: undefined,
      dcsDicomPort: undefined,
      hospitalRealm: '',
      keycloakUrl: '',
      keycloakLoginId: '',
      keycloakLoginPw: '',
    },
  });

  const testSetsList = caseSets;

  const handleClose = () => {
    setIsOpen(false);
  };

  const fetchExecutionLog = async () => {
    if (!executionApi) return;

    const response = await executionApi.getExecutionLogs();
    if (response) {
      setExecutionLogs(response);
    }
  };
  const onSubmit: SubmitHandler<ExecutionForm> = async (data) => {
    if (!executionApi) return;
    const response = await executionApi.createExecution(data);

    if (response) {
      fetchExecutionLog();
      handleClose();
    }
  };
  return (
    <CreateDialog
      open={isOpen}
      onClose={(_, reason) => {
        if (reason === 'backdropClick') return;
        handleClose();
      }}
      disableRestoreFocus
    >
      <CreateDialogTitle>Create execution</CreateDialogTitle>
      <CreateDialogContent>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <CreateDialogContentText>Test sets: </CreateDialogContentText>
          <Controller
            name="testSets"
            control={control}
            defaultValue={[]}
            rules={{ required: 'Field required' }}
            render={({ field, fieldState }) => (
              <CreateDialogFormControl fullWidth>
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
                  sx={{
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  }}
                >
                  {testSetsList.map((name) => (
                    <CreateDialogMenuItem key={name.id} value={name.title}>
                      <CreateDialogCheckbox checked={field.value?.includes(name.title)} />
                      <ListItemText primary={name.title} />
                    </CreateDialogMenuItem>
                  ))}
                </Select>
                {fieldState.error && (
                  <CreateDialogContentText>
                    {fieldState.error.message}
                  </CreateDialogContentText>
                )}
              </CreateDialogFormControl>
            )}
          />
          {executionFormField.map(({ label, name, type }) => (
            <Box key={name}>
              <CreateDialogContentText>{label}: </CreateDialogContentText>
              <Controller
                name={name}
                control={control}
                defaultValue={''}
                rules={{
                  required: 'Field required',
                  validate:
                    name === 'gatePcIp'
                      ? (value) => validator.isIP(String(value)) || 'Invalid IP address'
                      : name === 'dcsApiPort' || name === 'dcsDicomPort'
                        ? (value) =>
                            validator.isInt(String(value), { min: 1, max: 65535 }) ||
                            'Port must be 1~65535'
                        : name === 'keycloakUrl'
                          ? (value) =>
                              validator.isURL(String(value), {
                                require_protocol: true,
                              }) || 'Invalid URL'
                          : undefined,
                }}
                render={({ field, fieldState }) => (
                  <CreateDialogFormControl fullWidth>
                    <OutlinedInput {...field} type={type} autoComplete="off" />
                    {fieldState.error && (
                      <CreateDialogContentText>
                        {fieldState.error.message}
                      </CreateDialogContentText>
                    )}
                  </CreateDialogFormControl>
                )}
              />
            </Box>
          ))}
          <DialogActions>
            <ExecutionDecisionButton onClick={handleClose}>
              Cancel
            </ExecutionDecisionButton>
            <ExecutionDecisionButton type="submit">Submit</ExecutionDecisionButton>
          </DialogActions>
        </StyledForm>
      </CreateDialogContent>
    </CreateDialog>
  );
};
