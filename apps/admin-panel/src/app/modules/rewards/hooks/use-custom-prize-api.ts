import { useHttpClient } from '@invorious/http-client-front';
import { useAccessToken } from '../../access-control/hooks/use-access-token';
import {
  CustomPrizeDTO,
  GetCustomPrizeResponse,
} from '@zooverse/api-interfaces';
import { AxiosError } from 'axios';
import { useErrorHandler } from '../../core/hooks/use-error-handler';

export function useCustomPrizeApi() {
  const { accessToken } = useAccessToken();
  const { validate } = useErrorHandler();
  const {
    get,
    put,
    post,
    delete: deleteRequest,
  } = useHttpClient({
    config: {
      baseURL: '/api/rewards/custom',
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

  const getCustomPrizes = async () => {
    return await get<GetCustomPrizeResponse>('');
  };

  const createCustomPrize = async (data: FormData) => {
    return await post<CustomPrizeDTO>('', data);
  };

  const updateCustomPrize = async (id: number, data: FormData) => {
    return await put(`/${id}`, data);
  };

  const deleteCustomPrize = async (id: number) => {
    return await deleteRequest(`/${id}`);
  };

  return {
    getCustomPrizes,
    updateCustomPrize,
    deleteCustomPrize,
    createCustomPrize,
  };
}
