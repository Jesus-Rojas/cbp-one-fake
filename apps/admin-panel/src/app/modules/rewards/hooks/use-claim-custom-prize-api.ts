import { AxiosError } from 'axios';
import {
  ClaimCustomPrizeDTO,
  CreateClaimCustomPrize,
  DeliverCustomPrize,
  GetClaimCustomPrizeResponse,
} from '@zooverse/api-interfaces';
import { useAccessToken } from '../../access-control/hooks/use-access-token';
import { useErrorHandler } from '../../core/hooks/use-error-handler';
import { useHttpClient } from '@invorious/http-client-front';

export function useClaimCustomPrizeApi() {
  const { accessToken } = useAccessToken();
  const { validate } = useErrorHandler();
  const {
    get,
    post,
    put,
    delete: deleteRequest,
  } = useHttpClient({
    config: {
      baseURL: '/api/rewards/custom-prize/claims',
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

  const createCustomPrizeClaim = async (body: CreateClaimCustomPrize) => {
    return await post<ClaimCustomPrizeDTO>('/create', body);
  };

  const getCustomPrizeClaims = async () => {
    return await get<GetClaimCustomPrizeResponse>('');
  };

  const updateCustomPrizeClaim = async (
    id: number,
    body: Partial<ClaimCustomPrizeDTO>,
  ) => {
    return await put<string>(`/${id}`, body);
  };

  const deleteCustomPrizeClaim = async (id: number) => {
    return await deleteRequest(`/${id}`);
  };

  const deliverCustomPrize = async (body: DeliverCustomPrize) => {
    return await put<string>('/deliver', body);
  };

  return {
    createCustomPrizeClaim,
    getCustomPrizeClaims,
    updateCustomPrizeClaim,
    deleteCustomPrizeClaim,
    deliverCustomPrize,
  };
}
