import React, { useState } from 'react';

import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Box,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { CreateExecutionButton } from './style';

export interface ExecutionForm {
  testPerformer: string;
  testSets: Array<string>;
  gatePcIp: string;
  dcsApiPort: number;
  dcsDicomPort: number;
  hospitalRealm: string;
  keycloakUrl: string;
  keycloakLoginId: string;
  keycloakLoginPw: string;
}
// TODO: getCaseSet -> testSetsList
export const testSetsList: Array<string> = [
  'smoke_case',
  'combination_sequences',
  'dispatch_priority',
  'exception',
  'holding_matching',
  'multisource',
  'pixeldata_imagetype',
  'remote_aetitle',
  'retry',
  'series_name',
  'slice_interpolation',
  'store_ordering_customize',
  'swift_matrix_size',
];
export const formField = [
  { label: 'test performer', name: 'testPerformer', type: 'text' },
  { label: 'gate pc ip', name: 'gatePcIp', type: 'text' },
  { label: 'dcs api port', name: 'dcsApiPort', type: 'number' },
  { label: 'dcs dicom port', name: 'dcsDicomPort', type: 'number' },
  { label: 'hospital realm', name: 'hospitalRealm', type: 'text' },
  { label: 'keycloak url', name: 'keycloakUrl', type: 'text' },
  { label: 'keycloak login id', name: 'keycloakLoginId', type: 'text' },
  { label: 'keycloak login pw', name: 'keycloakLoginPw', type: 'text' },
];
export function FormDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const { control, register } = useForm<ExecutionForm>();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <CreateExecutionButton onClick={handleOpen}>Create Execution</CreateExecutionButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson);
            handleClose();
          },
        }}
      >
        {/* 
          TODO: Blocked aria-hidden on an element because its descendant retained focus. 
          The focus must not be hidden from assistive technology users. 
          Avoid using aria-hidden on a focused element or its ancestor. 
          Consider using the inert attribute instead, which will also prevent focus. 
          Submit 버튼 누르면 위의 오류가 아주 짧게 나타났다가 사라지는 원인 찾기
      */}
        <DialogTitle>Create Execution</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter sth</DialogContentText>
          <Box>
            <DialogContentText>test sets: </DialogContentText>
            <Controller
              name="testSets"
              control={control}
              render={({ field }) => (
                <select {...field}>
                  {testSetsList.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              )}
            />
          </Box>
          {formField.map((field) => (
            <Box key={field.name}>
              <DialogContentText>{field.label}: </DialogContentText>
              <TextField
                required
                margin="dense"
                type={field.type}
                fullWidth
                variant="standard"
                {...register(field.name as keyof ExecutionForm)}
              />
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
