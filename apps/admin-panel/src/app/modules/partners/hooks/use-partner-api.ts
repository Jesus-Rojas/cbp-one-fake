import { useHttpClient } from '@invorious/http-client-front';
import {
  FindPartnerResponse,
  GetPartnersResponse,
} from '@zooverse/api-interfaces';
import { AxiosError } from 'axios';
import { useAccessToken } from '../../access-control/hooks/use-access-token';
import { useErrorHandler } from '../../core/hooks/use-error-handler';

export function usePartnerApi() {
  const { accessToken } = useAccessToken();
  const { validate } = useErrorHandler();
  const {
    post,
    get,
    put,
    delete: remove,
  } = useHttpClient({
    config: {
      baseURL: '/api/partners',
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

  const getPartners = () => {
    return get<GetPartnersResponse>('');
  };

  const getPartner = (id: number) => {
    return get<FindPartnerResponse>(id.toString());
  };

  const createPartner = (data: FormData) => {
    return post('', data);
  };

  const updatePartner = (id: number, data: FormData) => {
    return put(id.toString(), data);
  };

  const removePartner = (id: number) => {
    return remove(id.toString());
  };

  return {
    getPartners,
    getPartner,
    createPartner,
    updatePartner,
    removePartner,
  };
}
