import { Login, LoginResponse } from '@cbp-one-fake/api-interfaces';
import { useHttpClient } from '@cbp-one-fake/http-client-front';
import { AxiosError } from 'axios';

import { useErrorHandler } from '../../core/hooks/use-error-handler';

export function useLoginApi() {
  const { validate } = useErrorHandler();
  const { post } = useHttpClient({
    config: {
      baseURL: '/api/login',
    },
    onError: ({ response }: AxiosError) => {
      if (response && response.status) {
        validate(response.status, response.data);
      }
    },
  });

  const login = (data: Login) => post<LoginResponse>('', data);

  return {
    login,
  };
}
