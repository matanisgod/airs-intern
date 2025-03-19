import React, { useEffect } from 'react';

import { DialogActions, Box, OutlinedInput, Select, ListItemText } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';

import { ExecutionForm, executionFormField } from './util';

import { useExecutionApi, useCaseSetApi } from '@common/api';
import {
  CreateDialogContentText,
  MenuProps,
  CreateDialog,
  CreateDialogTitle,
  CancelButton,
  SubmitButton,
  CreateDialogContent,
  CreateDialogFormControl,
  CreateDialogCheckbox,
  CreateDialogMenuItem,
} from '@components';
import {
  caseSetsAtom,
  isExecutionDialogOpenAtom,
  executionLogsAtom,
} from '@recoil/status';

export const CreateExecutionDialog = () => {
  const executionApi = useExecutionApi();
  const caseSetApi = useCaseSetApi();

  const { control, handleSubmit } = useForm<ExecutionForm>({
    //나중에 지우기
    defaultValues: {
      testSets: [],
      version: '1',
      description: '1',
      testPerformer: 'junha',
      gatePcIp: '192.168.40.42',
      dcsApiPort: 5000,
      dcsDicomPort: 30001,
      hospitalRealm: 'PQ42',
      keycloakUrl: 'https://auth.apne2-dev.airsmed.io/auth/',
      keycloakLoginId: 'csuser',
      keycloakLoginPw: 'returnAIRSMEDICAL!23',
    },
  });
  const caseSet = useRecoilValue(caseSetsAtom);

  const [isOpen, setIsOpen] = useRecoilState(isExecutionDialogOpenAtom);

  const setExecutionLogs = useSetRecoilState(executionLogsAtom);
  const setCaseSets = useSetRecoilState(caseSetsAtom);

  const testSetsList = caseSet.map((item) => item.title);

  useEffect(() => {
    if (!caseSetApi) return;

    caseSetApi.getCaseSets().then((response) => {
      if (response) {
        setCaseSets(response);
      }
    });
  }, [caseSetApi]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const onSubmit: SubmitHandler<ExecutionForm> = async (data) => {
    if (!executionApi) return;
    const response = await executionApi.createExecution(data);

    if (response) {
      setExecutionLogs((executionLogs) => [...executionLogs, response]);
      handleClose();
    }
  };

  return (
    <React.Fragment>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <CreateDialogContentText>Test sets: </CreateDialogContentText>
            <Controller
              name="testSets"
              control={control}
              defaultValue={[]}
              rules={{ required: '필수 입력' }}
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
                      <CreateDialogMenuItem key={name} value={name}>
                        <CreateDialogCheckbox checked={field.value?.includes(name)} />
                        <ListItemText primary={name} />
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
                  rules={{ required: '필수 입력' }}
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
              <CancelButton onClick={handleClose}>Cancel</CancelButton>
              <SubmitButton type="submit">Submit</SubmitButton>
            </DialogActions>
          </form>
        </CreateDialogContent>
      </CreateDialog>
    </React.Fragment>
  );
};

export * from './util';
