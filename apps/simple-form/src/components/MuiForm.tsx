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
  role: NestedValue<Role[]>;
};

export const MUIForm: VFC = () => {
  const { control, handleSubmit } = useForm<MUIFormInputs>({
    defaultValues: { name: '', gender: '', role: [] },
  });
  const onValid = (data: MUIFormInputs) => console.log(data);
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
          {ROLES.map((r) => (
            <FormControlLabel
              label={r}
              key={r}
              control={
                <Controller
                  name={'role'}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      checked={value.includes(r)}
                      onChange={(e) =>
                        e.target.checked
                          ? onChange([...value, r])
                          : onChange(value.filter((v) => v !== r))
                      }
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
