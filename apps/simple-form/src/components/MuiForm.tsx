import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import React, { VFC } from 'react';
import { Controller, NestedValue, useForm } from 'react-hook-form';

const GENDER = {
  MALE: 1,
  female: 2,
} as const;

const ROLES = ['OWNER', 'ADMIN', 'USER'] as const;
type Role = typeof ROLES[number];
type MUIFormInputs = {
  name: string;
  gender: string;
  roles: NestedValue<Role[]>;
};

export const MUIForm: VFC = () => {
  const { control, handleSubmit, getValues } = useForm<MUIFormInputs>({
    defaultValues: { name: '', gender: '', roles: [] },
  });
  const onValid = (data: MUIFormInputs) => console.log(data);

  const getNewRoles = (checkedRole: Role) => {
    return getValues().roles.includes(checkedRole)
      ? getValues().roles.filter((role) => role !== checkedRole)
      : [...getValues().roles, checkedRole];
  };

  return (
    <Box py={2}>
      <form onSubmit={handleSubmit(onValid)}>
        <Box py={2}>
          <Controller
            control={control}
            render={({ field }) => (
              <TextField
                label={'名前'}
                color={'primary'}
                size={'small'}
                variant={'outlined'}
                {...field}
              />
            )}
            name={'name'}
          />
        </Box>
        <Box>
          <Controller
            render={({ field }) => (
              <FormControl>
                <FormLabel>性別</FormLabel>
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value={'female'}
                    control={<Radio />}
                    label={'男性'}
                  />
                  <FormControlLabel
                    value={'male'}
                    control={<Radio />}
                    label={'女性'}
                  />
                </RadioGroup>
              </FormControl>
            )}
            name={'gender'}
            control={control}
          />
        </Box>
        <Box>
          {ROLES.map((role) => (
            <FormControlLabel
              label={role}
              key={role}
              control={
                <Controller
                  name={'roles'}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value.includes(role)}
                      onChange={() => field.onChange(getNewRoles(role))}
                    />
                  )}
                />
              }
            />
          ))}
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
