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

import { caseSetForm, formField } from './util';

import { useCaseSetApi } from '@/common/api';
import {
  CreateDialogContentText,
  CancelSubmitButton,
  CreateButton,
  CreateDialog,
  CreateDialogTitle,
} from '@components';
import {
  caseSetsAtom,
  isCaseSetDialogOpenAtom,
  isErrorModalOpenAtom,
} from '@recoil/status';

export const CreateCaseSetDialog = () => {
  const caseSetApi = useCaseSetApi();
  const { control, handleSubmit } = useForm<caseSetForm>();
  const [isOpen, setIsOpen] = useRecoilState(isCaseSetDialogOpenAtom);

  const setErrorModalOpen = useSetRecoilState(isErrorModalOpenAtom);
  const setCaseSets = useSetRecoilState(caseSetsAtom);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const fetchCaseSet = async (body: caseSetForm) => {
    if (!caseSetApi) return;
    const response = await caseSetApi.importCaseSet(body);
    if (response) {
      setCaseSets((caseSets) => [...caseSets, response]);
      handleClose();
    } else {
      setErrorModalOpen(true);
    }
  };
  const onSubmit: SubmitHandler<caseSetForm> = (data) => {
    fetchCaseSet(data);
  };

  //TODO: YAML data 2가지 어떻게 입력받을지
  return (
    <React.Fragment>
      <CreateButton onClick={handleOpen}>Create case set</CreateButton>
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
      </CreateDialog>
    </React.Fragment>
  );
};

export * from './util';
