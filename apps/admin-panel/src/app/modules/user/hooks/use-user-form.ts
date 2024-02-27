import { AuthUser } from '@cbp-one-fake/api-interfaces';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { UserFormProps } from '../components/user-form';
import { FormMode } from '../../core/types/form-mode.enum';
import { useUserApi } from './use-user-api';
import { useToast } from '../../core/hooks/use-toast';

export function useUserForm(props: UserFormProps) {
  const { mode } = props;
  const { id } = useParams();
  const formMethods = useForm<AuthUser>();
  const navigate = useNavigate();
  const { control, handleSubmit, getValues, reset, setValue } = formMethods;
  const [loading, setLoading] = useState(false);
  const { createUser } = useUserApi();
  const { showToast } = useToast();

  async function create() {
    setLoading(true);
    const { password, username } = getValues();
    try {
      await createUser({ password, username });
      showToast('User was created');
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  async function submit() {
    if (mode === FormMode.Create) {
      await create();
    }

    navigate(`/users`);
  }

  const currentMode = () => 'Create an user';

  return {
    formMethods,
    handleSubmit,
    submit,
    control,
    mode,
    loading,
    currentMode,
  };
}
