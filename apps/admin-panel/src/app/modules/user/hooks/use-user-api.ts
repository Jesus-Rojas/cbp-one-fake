import { useHttpClient } from '@cbp-one-fake/http-client-front';
import { AuthUser, CreateAuthUser } from '@cbp-one-fake/api-interfaces';
import { AxiosError } from 'axios';

import { useAccessToken } from '../../access-control/hooks/use-access-token';
import { useErrorHandler } from '../../core/hooks/use-error-handler';

export function useUserApi() {
  const { accessToken } = useAccessToken();
  const { validate } = useErrorHandler();
  const {
    post,
    get,
    put,
    delete: remove,
  } = useHttpClient({
    config: {
      baseURL: '/api/auth-user',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    onError: ({ response }: AxiosError) => {
      if (response && response.status) {
        validate(response.status, response.data);
      }
    },
  });

  const getUsers = () => get<AuthUser[]>('');
  const createUser = (data: CreateAuthUser) => post('', data);
  const removeUser = (id: number) => remove(id.toString());

  return {
    getUsers,
    createUser,
    removeUser,
  };
}
