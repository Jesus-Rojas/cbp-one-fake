import { Login, LoginResponse } from '@cbp-one-fake/api-interfaces';
import { useHttpClient } from '@cbp-one-fake/http-client-front';
import { AxiosError } from 'axios';
import { useAccessToken } from './use-access-token';


export function useLoginApi() {
  const { accessToken } = useAccessToken();
  const { post, get } = useHttpClient({
    config: {
      baseURL: '/api/login',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    },
  });

  const login = (data: Login) => post<LoginResponse>('', data);
  const me = () => get('me');

  return {
    login,
    me,
  };
}
