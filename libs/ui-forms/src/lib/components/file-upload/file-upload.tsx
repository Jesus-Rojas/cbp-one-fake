import { FileUploader } from 'react-drag-drop-files';
import { ControllerProps } from 'react-hook-form';
import { BaseField } from '../base-field/base-field';
import { FormControl } from '../../types/form-control';

import { FileUploadContent } from '../file-upload-content/file-upload-content';

export interface FileUploadProps extends FormControl<File> {
  types: string[];
}

export function FileUpload(props: FileUploadProps) {
  const { name, control, validators, types } = props;

  const render: ControllerProps['render'] = ({ field, fieldState }) => (
    <FileUploader
      children={
        <FileUploadContent
          file={field.value}
          fileTypes={types}
          error={fieldState.error?.message}
        />
      }
      handleChange={field.onChange}
      types={types}
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
