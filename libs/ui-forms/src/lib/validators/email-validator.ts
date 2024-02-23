import { Validator } from '../types/validator';

export function emailValidator(
  errorMessage = 'Must be a valid email',
): Validator<string> {
  return (value: string | undefined | null) => {
    const emailRegExp = new RegExp(
      '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
    );

    if (value && emailRegExp.test(value)) return null;
    return errorMessage;
  };
}
