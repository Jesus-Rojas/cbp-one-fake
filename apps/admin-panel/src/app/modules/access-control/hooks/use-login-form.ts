import { JwtPayload, Login, RoleType } from '@cbp-one-fake/api-interfaces';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useLoginApi } from './use-login-api';
import { useToast } from '../../core/hooks/use-toast';
import { useAccessToken } from './use-access-token';

export function useLoginForm() {
  const formMethods = useForm<Login>();
  const navigate = useNavigate();
  const { control, handleSubmit, getValues } = formMethods;
  const [loading, setLoading] = useState(false);
  const { login } = useLoginApi();
  const { showToast } = useToast();
  const { updateToken } = useAccessToken();

  const isAdmin = (accessToken: string) => {
    const [, payloadEncoded] = accessToken.split('.');
    const payload: JwtPayload = JSON.parse(atob(payloadEncoded));
    return payload.role === RoleType.Admin;
  };

  async function submit() {
    const { password, username } = getValues();
    setLoading(true);
    try {
      const { accessToken } = await login({ password, username });
      if (!isAdmin(accessToken)) {
        showToast('Role admin is required', 'error');
        setLoading(false);
        return;
      }
      updateToken(accessToken);
      showToast('Login success');
      navigate('/panel');
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  return {
    formMethods,
    handleSubmit,
    submit,
    control,
    loading,
  };
}
