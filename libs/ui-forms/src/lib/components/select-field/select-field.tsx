import { Autocomplete, TextField } from '@mui/material';
import { ControllerProps, useForm, useWatch } from 'react-hook-form';
import { BaseField } from '../base-field/base-field';
import { ReactNode, useEffect } from 'react';
import { FormControl } from '../../types/form-control';
import { useFetch } from 'use-http';

export interface SelectFieldProps<T> extends FormControl<T> {
  size?: 'small' | 'medium' | undefined;
  label?: string;
  apiPath?: string;
  options?: T[];
  getOptionLabel: (element: T) => string;
  renderOption?: (element: T) => ReactNode;
  isOptionEqualToValue: (elementA: T, elementB: T) => boolean;
  multiple?: boolean;
  className?: string;
  small?: boolean;
  onChange?: () => void;
}
function WatchAutoComplete<T>(props: SelectFieldProps<T> & any) {
  const {
    control,
    size,
    label,
    field,
    emptyValue,
    getOptionLabel,
    autoCompleteOptions,
    fieldState,
    renderOption,
    isOptionEqualToValue,
    multiple,
    className,
    small,
    onChange,
  } = props;

  const value = useWatch({
    control,
    name: field.name,
    defaultValue: emptyValue,
  });

  return (
    <Autocomplete
      size={size}
      className={className}
      value={value || emptyValue}
      onChange={(_, value) => {
        field.onChange(value);
        if (onChange) onChange();
      }}
      options={autoCompleteOptions}
      autoHighlight
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      multiple={!!multiple}
      renderOption={
        renderOption
          ? (props, option) => <li {...props}>{renderOption(option)}</li>
          : undefined
      }
      renderInput={(params) => (
        <TextField
          {...params}
          size={small ? 'small' : 'medium'}
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
          }}
        />
      )}
    />
  );
}

export function SelectField<T>(props: SelectFieldProps<T>) {
  const { name, control, validators, apiPath, options, multiple } = props;
  const { get: fetchOptions, data: asyncOptions = [] } = useFetch(apiPath);

  useEffect(() => {
    if (apiPath) {
      fetchOptions();
    }
  }, [apiPath, fetchOptions]);

  const emptyValue = multiple ? [] : null;
  const autoCompleteOptions = options || asyncOptions;

  const render: ControllerProps['render'] = ({ field, fieldState }) => {
    return (
      <WatchAutoComplete
        {...props}
        emptyValue={emptyValue}
        autoCompleteOptions={autoCompleteOptions}
        field={field}
        fieldState={fieldState}
      />
    );
  };

  return (
    <BaseField
      name={name}
      control={control}
      validators={validators}
      render={render}
    />
  );
}
