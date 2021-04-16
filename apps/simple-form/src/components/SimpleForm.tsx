import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import React, { useEffect, VFC } from 'react';
import { useForm } from 'react-hook-form';
import { mixed, object, string } from 'yup';

const ANSWERS = ['A', 'B'] as const;
type Answer = typeof ANSWERS[number];

type SimpleFormInputs = {
  name: string;
  answer: Answer;
};

const schema = object().shape({
  name: string().required(),
  answer: mixed()
    .oneOf([...ANSWERS])
    .required(), // ANSWERS直接だとreadonly型だから合わない
});

export const SimpleForm: VFC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SimpleFormInputs>({
    resolver: yupResolver(schema),
  });
  const onValid = (data) => console.log(data);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <Box py={2}>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <input {...register('name')} />
        </div>
        <div>
          <input {...register('answer')} />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </Box>
  );
};
