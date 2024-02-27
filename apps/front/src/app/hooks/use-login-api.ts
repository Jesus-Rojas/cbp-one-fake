import { Login, LoginResponse } from '@cbp-one-fake/api-interfaces';
import { useHttpClient } from '@cbp-one-fake/http-client-front';
import { AxiosError } from 'axios';


export function useLoginApi() {
  const { post } = useHttpClient({
    config: {
      baseURL: '/api/login',
    },
  });

  const login = (data: Login) => post<LoginResponse>('', data);

  return {
    login,
  };
}
