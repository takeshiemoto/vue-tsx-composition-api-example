import { Box, Button, TextField } from '@material-ui/core';
import React, { VFC } from 'react';
import { Controller, useForm } from 'react-hook-form';

type SimpleFormInputs = {
  name: string;
  message: string;
};
const SimpleForm: VFC = () => {
  const { register, handleSubmit } = useForm<SimpleFormInputs>();
  const onValid = (data) => console.log(data);
  return (
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
  );
};

type MUIFormInputs = {
  name: string;
};
const MUIForm: VFC = () => {
  const { control, handleSubmit } = useForm<MUIFormInputs>();
  const onValid = (data: MUIFormInputs) => console.log(data);
  return (
    <Box py={2}>
      <form onSubmit={handleSubmit(onValid)}>
        <Box>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur } }) => (
              <TextField
                color={'primary'}
                size={'small'}
                variant={'outlined'}
                onChange={onChange}
                onBlur={onBlur}
                fullWidth
              />
            )}
            name={'name'}
          />
        </Box>
        <Box mt={2}>
          <Button type={'submit'} color={'primary'} variant={'contained'}>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export function Index() {
  return (
    <div>
      <SimpleForm />
      <MUIForm />
    </div>
  );
}

export default Index;
