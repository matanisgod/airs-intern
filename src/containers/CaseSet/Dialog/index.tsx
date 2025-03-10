import React from 'react';

import {
  DialogContent,
  DialogActions,
  Box,
  FormControl,
  OutlinedInput,
} from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import { caseSetForm, formField } from './util';

import { useCaseSetApi } from '@/common/api';
import { CreateDialogContentText, CancelSubmitButton } from '@components';
import {
  caseSetsAtom,
  isCaseSetDialogOpenAtom,
  isErrorModalOpenAtom,
} from '@recoil/status';

export const CreateCaseSetDialog = () => {
  const caseSetApi = useCaseSetApi();
  const { control, handleSubmit } = useForm<caseSetForm>();
  const setErrorModalOpen = useSetRecoilState(isErrorModalOpenAtom);
  const setCaseSets = useSetRecoilState(caseSetsAtom);
  const setOpen = useSetRecoilState(isCaseSetDialogOpenAtom);

  const handleClose = () => {
    setOpen(false);
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

  return (
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
  );
};
