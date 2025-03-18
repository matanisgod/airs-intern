import React from 'react';

import {
  DialogContent,
  DialogActions,
  Box,
  FormControl,
  OutlinedInput,
} from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useSetRecoilState, useRecoilState } from 'recoil';

import { CaseSetForm, caseSetFormField } from './util';

import { useCaseSetApi } from '@/common/api';
import {
  CreateDialogContentText,
  CreateDialog,
  CreateDialogTitle,
  CancelButton,
  SubmitButton,
} from '@components';
import { caseSetsAtom, isCaseSetDialogOpenAtom } from '@recoil/status';

export const CreateCaseSetDialog = () => {
  const caseSetApi = useCaseSetApi();

  const [isOpen, setIsOpen] = useRecoilState(isCaseSetDialogOpenAtom);

  const setCaseSets = useSetRecoilState(caseSetsAtom);

  const { control, handleSubmit } = useForm<CaseSetForm>();

  const handleClose = () => {
    setIsOpen(false);
  };

  const onSubmit: SubmitHandler<CaseSetForm> = async (data) => {
    if (!caseSetApi) return;

    const response = await caseSetApi.importCaseSet(data);
    if (response) {
      setCaseSets((caseSets) => [...caseSets, response]);
      handleClose();
    }
  };

  //TODO: YAML data 2가지 어떻게 입력받을지
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
        <CreateDialogTitle>Create case set</CreateDialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {caseSetFormField.map(({ label, name, type }) => (
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
              <CancelButton onClick={() => handleClose}>Cancel</CancelButton>
              <SubmitButton type="submit">Submit</SubmitButton>
            </DialogActions>
          </form>
        </DialogContent>
      </CreateDialog>
    </React.Fragment>
  );
};

export * from './util';
