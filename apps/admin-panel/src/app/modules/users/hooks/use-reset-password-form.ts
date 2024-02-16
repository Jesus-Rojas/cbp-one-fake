import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ResetPasswordRequest } from '@zooverse/api-interfaces';
import { useUserApi } from './use-user-api';
import { useToast } from '../../core/hooks/use-toast';

export function useResetPasswordForm() {
  const formMethods = useForm<ResetPasswordRequest>();
  const { control, handleSubmit, getValues, reset } = formMethods;
  const [loading, setLoading] = useState(false);
  const { resetPasswordUser } = useUserApi();
  const { showToast } = useToast();

  async function submit() {
    setLoading(true);
    const { address } = getValues();
    try {
      await resetPasswordUser({ address });
      showToast(`Password of ${address} was updated`);
      setLoading(false);
    } catch (axiosError: any) {
      showToast(axiosError.response.data.message, 'error');
      setLoading(false);
    }
    reset();
  }

  return {
    formMethods,
    handleSubmit,
    submit,
    control,
    loading,
  };
}
