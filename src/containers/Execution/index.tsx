import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { PageButton, ExecutionText } from '@components';
import { ExecutionBox } from './style';
import { useRecoilValue, useRecoilState } from 'recoil';
import { executionAtom } from '@/recoil/status';
import { ExecutionForm, TestSetsList } from './util';
import { CommonModal } from '@components';
import { Box, Button } from '@mui/material';
import { useState } from 'react';

const Execution: React.FC = () => {
  const navi = useNavigate();
  const { register, handleSubmit, control } = useForm<ExecutionForm>();
  const createExecution = (data) => {
    console.log(data);
    setIsOpen(false);
  };
  const execution = useRecoilValue(executionAtom);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ExecutionBox>
      <Button onClick={() => setIsOpen(true)} style={{ color: 'red' }}>
        open modal
      </Button>
      <ExecutionText>Execution</ExecutionText>
      <PageButton onClick={() => navi('/caseset')}>move to caseset</PageButton>
      <CommonModal open={isOpen}>
        <form onSubmit={handleSubmit(createExecution)}>
          <Box>
            <label>test performer: </label>
            <input type="text" {...register('testPerformer')} />
          </Box>
          {/* TODO: test sets UI 개선 */}
          <Box>
            <label>test sets: </label>
            <Controller
              name="testSets"
              control={control}
              render={({ field }) => (
                <select {...field}>
                  {TestSetsList.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              )}
            />
          </Box>
          {/*<Box>
            <label>test sets: </label>
            <input type="text" {...register('testSets')} />
          </Box>
          */}
          <Box>
            <label>gate pc ip: </label>
            <input type="text" {...register('gatePcIp')} />
          </Box>
          <Box>
            <label>dcs api port: </label>
            <input type="text" {...register('dcsApiPort')} />
          </Box>
          <Box>
            <label>dcs dicom port: </label>
            <input type="text" {...register('dcsDicomPort')} />
          </Box>
          <Box>
            <label>hospital realm: </label>
            <input type="text" {...register('hospitalRealm')} />
          </Box>
          <Box>
            <label>keycloak url: </label>
            <input type="text" {...register('keycloakUrl')} />
          </Box>
          <Box>
            <label>keycloak login id: </label>
            <input type="text" {...register('keycloakLoginId')} />
          </Box>
          <Box>
            <label>keycloak login pw: </label>
            <input type="text" {...register('keycloakLoginPw')} />
          </Box>
          <Box>
            <button type="submit">Submit</button>
          </Box>
        </form>
      </CommonModal>
    </ExecutionBox>
  );
};

export default Execution;
