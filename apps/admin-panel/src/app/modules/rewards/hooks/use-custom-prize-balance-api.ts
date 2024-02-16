import { useHttpClient } from '@invorious/http-client-front';
import { useAccessToken } from '../../access-control/hooks/use-access-token';
import { GetCustomPrizeBalanceResponse } from '@zooverse/api-interfaces';
import { AxiosError } from 'axios';
import { useErrorHandler } from '../../core/hooks/use-error-handler';

export function useCustomPrizeBalanceApi() {
  const { accessToken } = useAccessToken();
  const { validate } = useErrorHandler();
  const { get } = useHttpClient({
    config: {
      baseURL: '/api/rewards/balance/custom-prize',
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

  const getCustomPrizeBalance = async () => {
    return await get<GetCustomPrizeBalanceResponse>('');
  };

  return { getCustomPrizeBalance };
}
