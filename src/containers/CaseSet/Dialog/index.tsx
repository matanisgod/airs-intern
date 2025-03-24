import React, { useState } from 'react';

import { DialogActions, Box, OutlinedInput, Typography } from '@mui/material';
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
  SelectButton,
} from '@components';
import { caseSetsAtom, isCaseSetDialogOpenAtom } from '@recoil/status';

export * from './util';

export const CreateCaseSetDialog = () => {
  const caseSetApi = useCaseSetApi();

  const [isOpen, setIsOpen] = useRecoilState(isCaseSetDialogOpenAtom);

  const setCaseSets = useSetRecoilState(caseSetsAtom);

  const { control, handleSubmit, setValue } = useForm<CaseSetForm>({
    defaultValues: {
      caseYamlFile: undefined,
      expectedResultYamlFile: undefined,
      type: '',
      title: '',
    },
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  const onSubmit: SubmitHandler<CaseSetForm> = async (data) => {
    if (!caseSetApi) return;

    const formData = new FormData();
    formData.append('caseYamlFile', data.caseYamlFile);
    formData.append('expectedResultYamlFile', data.expectedResultYamlFile);
    formData.append('type', data.type);
    formData.append('title', data.title);

    const response = await caseSetApi.importCaseSet(formData);
    if (response) {
      setCaseSets((caseSets) => [...caseSets, response]);
      handleClose();
    }
  };

  const [caseYamlFile, setCaseYmlFile] = useState<string>('');
  const [expectedResultYamlFile, setErYmlFile] = useState<string>('');

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
                        <>
                          <input
                            type="file"
                            accept=".yml, .yaml"
                            hidden
                            id={name}
                            onChange={(e) => {
                              if (e.target.files) {
                                const extension = e.target.files[0].name
                                  .split('.')
                                  .pop()
                                  ?.toLowerCase();

                                if (extension !== 'yml' && extension !== 'yaml') {
                                  alert('Only .yml or .yaml files are allowed.');
                                  return;
                                }

                                setValue(name, e.target.files[0]);
                                if (name === 'caseYamlFile')
                                  setCaseYmlFile(e.target.files[0]?.name);
                                else setErYmlFile(e.target.files[0]?.name);
                              }
                            }}
                          />
                          <label htmlFor={name}>
                            <SelectButton component="span">Select YAML file</SelectButton>
                          </label>
                          {name === 'caseYamlFile' && caseYamlFile && (
                            <Typography sx={{ fontStyle: 'italic' }}>
                              {caseYamlFile}
                            </Typography>
                          )}
                          {name === 'expectedResultYamlFile' &&
                            expectedResultYamlFile && (
                              <Typography sx={{ fontStyle: 'italic' }}>
                                {expectedResultYamlFile}
                              </Typography>
                            )}
                        </>
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
