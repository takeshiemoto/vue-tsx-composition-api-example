import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@material-ui/core';
import React, { VFC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, mixed, object, string } from 'yup';

const GENDER = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
} as const;
type Gender = typeof GENDER[keyof typeof GENDER];

const ROLES = {
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
  GUEST: 'GUEST',
} as const;
type Role = typeof ROLES[keyof typeof ROLES];

const AREAS = [
  '北海道',
  '東北',
  '関東',
  '北陸',
  '中部',
  '近畿',
  '中国',
  '四国',
  '九州',
  '沖縄',
] as const;
type Area = typeof AREAS[number];

type MUIFormInputs = {
  name: string;
  gender: Gender;
  roles: Role[];
  area: Area;
};

const schema = object().shape({
  name: string().required(),
  gender: mixed().oneOf([...Object.keys(GENDER)]),
  roles: array<Role[]>(),
  area: mixed().oneOf([...AREAS]),
});

export const MUIForm: VFC = () => {
  const { control, handleSubmit, getValues } = useForm<MUIFormInputs>({
    defaultValues: { name: '', roles: [], gender: GENDER.MALE, area: '北海道' },
    resolver: yupResolver(schema),
  });
  const onValid = (data: MUIFormInputs) => console.log(data);

  const handleCheck = (checkedRole: Role): Role[] => {
    return getValues().roles.includes(checkedRole)
      ? getValues().roles.filter((role) => role !== checkedRole)
      : [...getValues().roles, checkedRole];
  };

  return (
    <Box py={2}>
      <form onSubmit={handleSubmit(onValid)}>
        <Box pt={2}>
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
        <Box pt={2}>
          <Controller
            render={({ field }) => (
              <FormControl>
                <FormLabel>性別</FormLabel>
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value={GENDER.MALE}
                    control={<Radio />}
                    label={'男性'}
                  />
                  <FormControlLabel
                    value={GENDER.FEMALE}
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
          {Object.values(ROLES).map((role) => (
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
                      onChange={() => field.onChange(handleCheck(role))}
                    />
                  )}
                />
              }
            />
          ))}
        </Box>
        <Box pt={2}>
          <FormControl>
            <FormLabel>出身地域</FormLabel>
            <Controller
              name={'area'}
              control={control}
              render={({ field }) => (
                <Select {...field} variant={'outlined'} size={'small'}>
                  {AREAS.map((area) => (
                    <MenuItem key={area} value={area}>
                      {area}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Box>
        <Box pt={2}>
          <Button type={'submit'} color={'primary'} variant={'contained'}>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};
