import { useHttpClient } from '@invorious/http-client-front';
import { useAccessToken } from '../../access-control/hooks/use-access-token';
import { AxiosError } from 'axios';
import { RewardDirectToAddress } from '@zooverse/api-interfaces';
import { useErrorHandler } from '../../core/hooks/use-error-handler';

export function useSendRewardFormApi() {
  const { accessToken } = useAccessToken();
  const { validate } = useErrorHandler();
  const { post } = useHttpClient({
    config: {
      baseURL: '/api/rewards/generate-direct-to-user',
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

  const createSendReward = (data: RewardDirectToAddress) => {
    return post('', data);
  };

  return {
    createSendReward,
  };
}
