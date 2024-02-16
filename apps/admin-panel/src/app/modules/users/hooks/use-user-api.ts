import { useHttpClient } from '@invorious/http-client-front';
import {
  ResetPasswordRequest,
  SetPasswordResponse,
} from '@zooverse/api-interfaces';
import { AxiosError } from 'axios';
import { useAccessToken } from '../../access-control/hooks/use-access-token';
import { useErrorHandler } from '../../core/hooks/use-error-handler';

export function useUserApi() {
  const { accessToken } = useAccessToken();
  const { validate } = useErrorHandler();
  const { post } = useHttpClient({
    config: {
      baseURL: '/api/user',
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

  const resetPasswordUser = (data: ResetPasswordRequest) => {
    return post<SetPasswordResponse>('reset', data);
  };

  return {
    resetPasswordUser,
  };
}
