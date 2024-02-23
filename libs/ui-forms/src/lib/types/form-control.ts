import { ControllerProps } from 'react-hook-form';
import { Validator } from './validator';

export interface FormControl<T> {
  name: ControllerProps['name'];
  control: any;
  validators?: Validator<T>[];
}
