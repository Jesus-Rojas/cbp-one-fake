import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';

interface PropsSelectSearch<
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
> extends Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    'renderInput'
  > {
  label: string;
}

export function SelectSearch<
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
>(props: PropsSelectSearch<T, Multiple, DisableClearable, FreeSolo>) {
  const { label, ...otherProps } = props;
  return (
    <Autocomplete
      {...otherProps}
      renderInput={(params) => (
        <TextField
          {...params}
          size={'medium'}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
          }}
        />
      )}
    />
  );
}
