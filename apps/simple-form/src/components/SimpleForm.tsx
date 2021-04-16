import { Box } from '@material-ui/core';
import React, { VFC } from 'react';
import { useForm } from 'react-hook-form';

type SimpleFormInputs = {
  name: string;
  message: string;
};
export const SimpleForm: VFC = () => {
  const { register, handleSubmit } = useForm<SimpleFormInputs>();
  const onValid = (data) => console.log(data);
  return (
    <Box py={2}>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <input {...register('name')} />
        </div>
        <div>
          <input {...register('message')} />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </Box>
  );
};
