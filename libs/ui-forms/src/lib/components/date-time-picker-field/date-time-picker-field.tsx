import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { ControllerProps } from 'react-hook-form';

import { FormControl } from '../../types/form-control';
import { BaseField } from '../base-field/base-field';


export type DateTimePickerFieldProps = FormControl<dayjs.Dayjs> & {
  label?: string;
  disabled: boolean;
};

export function DateTimePickerField(props: DateTimePickerFieldProps) {
  const { name, control, validators, label, disabled } = props;

  const render: ControllerProps['render'] = ({ field }) => (
    <DateTimePicker
      {...field} 
      label={label} 
      disabled={disabled}
      views={['year', 'month', 'day', 'hours', 'minutes']}
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
