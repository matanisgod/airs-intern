import React from 'react';

import { DialogActions, Box, OutlinedInput } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useSetRecoilState, useRecoilState } from 'recoil';

import { CaseSetForm, caseSetFormField } from './util';

import { useCaseSetApi } from '@common/api';
import {
  CreateDialogContentText,
  CreateDialog,
  CreateDialogTitle,
  CancelButton,
  SubmitButton,
  CreateDialogFormControl,
  CreateDialogContent,
} from '@components';
import { caseSetsAtom, isCaseSetDialogOpenAtom } from '@recoil/status';

export * from './util';

export const CreateCaseSetDialog = () => {
  const caseSetApi = useCaseSetApi();

  const [isOpen, setIsOpen] = useRecoilState(isCaseSetDialogOpenAtom);

  const setCaseSets = useSetRecoilState(caseSetsAtom);

  const { control, handleSubmit, setValue } = useForm<CaseSetForm>();

  const handleClose = () => {
    setIsOpen(false);
  };

  const onSubmit: SubmitHandler<CaseSetForm> = async (data) => {
    if (!caseSetApi) return;

    const formData = new FormData();
    formData.append('caseYmlFile', data.caseYmlFile[0]);
    formData.append('erYmlFile', data.erYmlFile[0]);
    formData.append('type', data.type);
    formData.append('title', data.title);

    const response = await caseSetApi.importCaseSet(formData);
    if (response) {
      setCaseSets((caseSets) => [...caseSets, response]);
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
        <CreateDialogTitle>Create case set</CreateDialogTitle>
        <CreateDialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {caseSetFormField.map(({ label, name, type }) => (
              <Box key={name}>
                <CreateDialogContentText>{label}:</CreateDialogContentText>
                <Controller
                  name={name}
                  control={control}
                  rules={{ required: '필수 입력' }}
                  render={({ field, fieldState }) => (
                    <CreateDialogFormControl fullWidth>
                      {type === 'file' ? (
                        <input
                          type="file"
                          accept=".yml, .yaml"
                          onChange={(e) => setValue(name, e.target.value)}
                        />
                      ) : (
                        <OutlinedInput {...field} type="text" autoComplete="off" />
                      )}
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
