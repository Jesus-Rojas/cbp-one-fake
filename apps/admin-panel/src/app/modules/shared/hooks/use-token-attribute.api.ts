import { useHttpClient } from '@invorious/http-client-front';
import { useAccessToken } from '../../access-control/hooks/use-access-token';
import { GetTokenAttributeResponse } from '@zooverse/api-interfaces';
import { useNavigate } from 'react-router-dom';
import { AxiosError, HttpStatusCode } from 'axios';

export function useTokenAttributeApi() {
  const { accessToken } = useAccessToken();
  const navigate = useNavigate();
  const { get } = useHttpClient({
    config: {
      baseURL: '/api/token/attributes',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    onError: ({ response }: AxiosError) => {
      if (response?.status === HttpStatusCode.Unauthorized) {
        navigate('/');
      }
    },
  });

  const getTokenAttributes = async () => {
    return await get<GetTokenAttributeResponse>('');
  };

  return { getTokenAttributes };
}
