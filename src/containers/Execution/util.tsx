import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Box,
  Checkbox,
  FormControl,
  OutlinedInput,
  Select,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import {
  CreateExecutionButton,
  CreateExecutionDialogTitle,
  CancelSubmitButton,
  TestSetsMenu,
  TestSetsText,
} from './style';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
// TODO: getCaseSet하고 그 caseSet의 title을 testSetsList로 쓸 수 있도록
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
  const {
    control,
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ExecutionForm>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    reset();
  };
  // TODO: disableRestoreFocus
  return (
    <React.Fragment>
      <CreateExecutionButton onClick={handleOpen}>Create Execution</CreateExecutionButton>
      <Dialog
        open={open}
        onClose={handleClose}
        disableRestoreFocus
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            formJson.testSets = JSON.stringify(getValues('testSets'));
            console.log(formJson);
            handleClose();
          },
        }}
      >
        <CreateExecutionDialogTitle>Create Execution</CreateExecutionDialogTitle>
        <DialogContent>
          <Box>
            <DialogContentText>test sets: </DialogContentText>
            <Controller
              name="testSets"
              control={control}
              rules={{ required: true }}
              defaultValue={[]}
              render={({ field }) => (
                <FormControl>
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
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {testSetsList.map((name) => (
                      <TestSetsMenu key={name} value={name}>
                        <Checkbox checked={field.value?.includes(name)} />
                        <TestSetsText primary={name} />
                      </TestSetsMenu>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Box>
          {formField.map((field) => (
            <Box key={field.name}>
              <DialogContentText>{field.label}: </DialogContentText>
              <TextField
                required
                autoComplete="off"
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
          <CancelSubmitButton
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </CancelSubmitButton>
          <CancelSubmitButton type="submit">Submit</CancelSubmitButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
