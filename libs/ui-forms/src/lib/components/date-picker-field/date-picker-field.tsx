import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { ControllerProps } from 'react-hook-form';

import { FormControl } from '../../types/form-control';
import { BaseField } from '../base-field/base-field';

export type DatePickerFieldProps = FormControl<dayjs.Dayjs> & {
  label?: string;
  disabled: boolean;
};

export function DatePickerField(props: DatePickerFieldProps) {
  const { name, control, validators, label, disabled } = props;

  const render: ControllerProps['render'] = ({ field }) => (
    <DatePicker 
      {...field} 
      label={label} 
      disabled={disabled}
      value={field.value || null}
    />
  );

  return (
    <BaseField
      name={name}
      control={control}
      validators={validators}
      render={render}
    />
  );
}
