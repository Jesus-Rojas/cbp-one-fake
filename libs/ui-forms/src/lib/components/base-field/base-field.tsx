import { MutableRefObject, useEffect } from 'react';
import { Controller, ControllerProps, useFormContext } from 'react-hook-form';
import { FormControl } from '../../types/form-control';
import { atom, useAtom } from 'jotai';
import { scrollIntoView } from 'seamless-scroll-polyfill';

const elementWithErrorAtom = atom<Element | null>(null);

export type BaseFieldProps<T> = FormControl<T> & {
  render: ControllerProps['render'];
  scrollRef?: MutableRefObject<Element | undefined>;
};

export function BaseField<T>(props: BaseFieldProps<T>) {
  const { name, control, validators, render, scrollRef } = props;
  const [elementWithError, setElementWithError] = useAtom(elementWithErrorAtom);
  const { formState } = useFormContext();

  useEffect(() => {
    setElementWithError(null);
  }, [formState.submitCount, setElementWithError]);

  const getError = (value: T) => {
    if (!validators) {
      return undefined;
    }

    for (const validator of validators) {
      const validationResult = validator(value);
      if (validationResult) {
        if (scrollRef && scrollRef.current && !elementWithError) {
          setElementWithError(scrollRef.current);
          scrollIntoView(scrollRef.current, {
            behavior: 'smooth',
            block: 'center',
          });
        }
        return validationResult;
      }
    }

    return undefined;
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ validate: getError }}
      render={render}
    />
  );
}
