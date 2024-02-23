import { Validator } from '../types/validator';

export function passwordValidator(
  errorMessage = 'Must be at least six (6) digits length',
): Validator<string> {
  return (value: string | undefined | null) => {
    if (value && value.length > 5) return null;
    return errorMessage;
  };
}
