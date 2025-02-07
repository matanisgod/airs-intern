import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { PageButton, ExecutionText } from '@components';
import { ExecutionBox } from './style';
import { useRecoilValue, useRecoilState } from 'recoil';
import { executionAtom } from '@/recoil/status';
import { ExecutionForm } from './util';
import { CommonModal } from '@components';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
//TODO: react-hook-form 사용해서 post execution (create execution)에 해당하는 form 받는 dialog 구현
const Execution: React.FC = () => {
  const navi = useNavigate();
  const { register, handleSubmit } = useForm<ExecutionForm>();
  const createExecution = (data) => {
    console.log(data);
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ExecutionBox>
      {/* TODO: setIsOpen 버튼 안 보이는 이슈 */}
      <Button onClick={() => setIsOpen(true)}>open modal</Button>
      <ExecutionText>Execution</ExecutionText>
      <PageButton onClick={() => navi('/caseset')}>move to caseset</PageButton>
      <CommonModal open={isOpen}>
        <form onSubmit={handleSubmit(createExecution)}>
          <Box>
            <label>test performer: </label>
            <input type="text" {...register('testPerformer')} />
          </Box>
          <Box>
            <label>test sets: </label>
            <input type="text" {...register('test_sets')} />
          </Box>
          <Box>
            <label>gate pc ip: </label>
            <input type="text" {...register('gate_pc_ip')} />
          </Box>
          <Box>
            <label>dcs api port: </label>
            <input type="text" {...register('dcs_api_port')} />
          </Box>
          <Box>
            <label>dcs dicom port: </label>
            <input type="text" {...register('dcs_dicom_port')} />
          </Box>
          <Box>
            <label>hospital realm: </label>
            <input type="text" {...register('hospital_realm')} />
          </Box>
          <Box>
            <label>keycloak url: </label>
            <input type="text" {...register('keycloak_url')} />
          </Box>
          <Box>
            <label>keycloak login id: </label>
            <input type="text" {...register('keycloak_login_id')} />
          </Box>
          <Box>
            <label>keycloak login pw: </label>
            <input type="text" {...register('keycloak_login_pw')} />
          </Box>
          <Box>
            <button type="submit" onClick={() => setIsOpen(false)}>
              Submit
            </button>
          </Box>
        </form>
      </CommonModal>
    </ExecutionBox>
  );
};

export default Execution;
