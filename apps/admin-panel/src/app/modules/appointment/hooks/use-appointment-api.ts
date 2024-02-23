import { useHttpClient } from '@cbp-one-fake/http-client-front';
import { Appointment, CreateAppointment } from '@cbp-one-fake/api-interfaces';
import { AxiosError } from 'axios';
import { useAccessToken } from '../../access-control/hooks/use-access-token';
import { useErrorHandler } from '../../core/hooks/use-error-handler';
import { environment } from '../../core/constants/environment';

export function useAppointmentApi() {
  const { accessToken } = useAccessToken();
  const { validate } = useErrorHandler();
  const {
    post,
    get,
    put,
    delete: remove,
  } = useHttpClient({
    config: {
      baseURL: environment.urlApi + '/appointments',
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

  const getAppointments = () => get<Appointment[]>('');
  const createAppointment = (data: CreateAppointment) => post('', data);
  const updateAppointment = (id: number, data: CreateAppointment) => put(id.toString(), data);
  const removeAppointment = (id: number) => remove(id.toString());

  return {
    getAppointments,
    createAppointment,
    updateAppointment,
    removeAppointment,
  };
}
