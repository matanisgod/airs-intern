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

import { CreateDialogContentText, CancelSubmitButton } from '@components';
import { isCaseSetDialogOpenAtom } from '@recoil/status';

export const CreateCaseSetDialog = () => {
  const { control, handleSubmit } = useForm<caseSetForm>();
  const setOpen = useSetRecoilState(isCaseSetDialogOpenAtom);

  const handleClose = () => {
    setOpen(false);
  };
  //TODO: post ㄱㄱㄱ
  const onSubmit: SubmitHandler<caseSetForm> = (data) => {
    console.log(data);
    handleClose();
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
