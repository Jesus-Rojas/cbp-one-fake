import { FormControlLabel, Switch, SwitchProps } from '@mui/material';
import { ControllerProps } from 'react-hook-form';
import { FormControl } from '../../types/form-control';
import { BaseField } from '../base-field/base-field';
import { useRef } from 'react';

export type SwitchFieldProps = SwitchProps & {
  label: string;
} & FormControl<string>;

export function SwitchField(props: SwitchFieldProps) {
  const { name, control, validators, label, ...rest } = props;
  const scrollRef = useRef<Element>();

  const render: ControllerProps['render'] = ({ field }) => (
    <FormControlLabel
      label={label}
      control={
        <Switch
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
