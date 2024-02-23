import { Validator } from '../types/validator';

export function minValueValidator(
  errorMessage = '',
  min = 1,
): Validator<string> {
  return (value: string | undefined | null) => {
    if (value && Number(value) >= min) return null;
    return errorMessage || `The field must be ${min} or more`;
  };
}
