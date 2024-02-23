import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';
import { ControllerProps } from 'react-hook-form';
import { FormControl } from '../../types/form-control';
import { BaseField } from '../base-field/base-field';
import { useRef } from 'react';

export type TextFieldProps = Omit<MuiTextFieldProps, 'variant'> & {
  variant?: MuiTextFieldProps['variant'];
} & FormControl<string>;

export function TextField(props: TextFieldProps) {
  const { name, control, validators, ...rest } = props;
  const scrollRef = useRef<Element>();

  const render: ControllerProps['render'] = ({ field, fieldState }) => (
    <MuiTextField
      variant={rest.disabled ? 'standard' : 'outlined'}
      {...rest}
      error={!!fieldState.error}
      helperText={fieldState.error ? fieldState.error.message : rest.helperText}
      value={field.value ?? ''}
      onChange={field.onChange}
      inputRef={scrollRef}
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
