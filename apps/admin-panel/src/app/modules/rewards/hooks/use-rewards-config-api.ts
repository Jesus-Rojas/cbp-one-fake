import { useHttpClient } from '@invorious/http-client-front';
import { useAccessToken } from '../../access-control/hooks/use-access-token';
import {
  CreateRewardConfigTableDTO,
  GetRewardConfigTableResponse,
  RewardConfigTableDTO,
  UpdateRewardConfigTableDTO,
} from '@zooverse/api-interfaces';
import { useNavigate } from 'react-router-dom';
import { AxiosError, HttpStatusCode } from 'axios';

export function useRewardConfigApi() {
  const { accessToken } = useAccessToken();
  const navigate = useNavigate();

  const {
    get,
    post,
    delete: deleteRequest,
    put,
  } = useHttpClient({
    config: {
      baseURL: 'api/rewards/configuration',
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

  const getRewardConfigTables = async () => {
    return await get<GetRewardConfigTableResponse>('');
  };

  const createRewardConfigTable = async (body: CreateRewardConfigTableDTO) => {
    return await post<RewardConfigTableDTO>('', body);
  };

  const deleteRewardConfigTable = async (id: number) => {
    return await deleteRequest(`/${id}`);
  };

  const updateRewardConfigTable = async (
    id: number,
    body: UpdateRewardConfigTableDTO,
  ) => {
    return await put(`/${id}`, body);
  };
  return {
    getRewardConfigTables,
    createRewardConfigTable,
    deleteRewardConfigTable,
    updateRewardConfigTable,
  };
}
