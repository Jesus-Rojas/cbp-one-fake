import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import { ControllerProps } from 'react-hook-form';
import { FormControl } from '../../types/form-control';
import { BaseField } from '../base-field/base-field';
import { useRef } from 'react';

export type CheckboxFieldProps = CheckboxProps & {
  label: string;
} & FormControl<boolean>;

export function CheckboxField(props: CheckboxFieldProps) {
  const { label, name, control, validators, ...rest } = props;
  const scrollRef = useRef<Element>();

  const render: ControllerProps['render'] = ({ field }) => (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          {...rest}
          checked={field.value ?? false}
          onChange={field.onChange}
        />
      }
    />
  );

  return (
    <BaseField
      name={name}
      control={control}
      validators={validators}
      scrollRef={scrollRef}
      render={render}
    />
  );
}
