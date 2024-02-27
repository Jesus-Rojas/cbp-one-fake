import { useHttpClient } from '@cbp-one-fake/http-client-front';
import { Appointment, CreateAppointment } from '@cbp-one-fake/api-interfaces';
import { AxiosError } from 'axios';
import { useAccessToken } from '../../access-control/hooks/use-access-token';
import { useErrorHandler } from '../../core/hooks/use-error-handler';

export function useAppointmentApi() {
  const { accessToken } = useAccessToken();
  const { validate } = useErrorHandler();
  const optionsHttpClient = {
    config: {
      baseURL: '/api/appointments',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    onError: ({ response }: AxiosError) => {
      if (response && response.status) {
        validate(response.status, response.data);
      }
    },
  };

  const { post, get, put, delete: remove } = useHttpClient(optionsHttpClient);

  const { get: getDownload } = useHttpClient({
    ...optionsHttpClient,
    config: {
      ...optionsHttpClient.config,
      responseType: 'blob',
    }
  });

  const getAppointments = () => get<Appointment[]>('');
  const getAppointment = (id: number) => get<Appointment>(id.toString());
  const downloadAppointment = (id: number) => getDownload<Blob>(`${id}/download`);
  const createAppointment = (data: CreateAppointment) => post('', data);
  const updateAppointment = (id: number, data: CreateAppointment) => put(id.toString(), data);
  const removeAppointment = (id: number) => remove(id.toString());
  

  return {
    getAppointments,
    getAppointment,
    createAppointment,
    updateAppointment,
    removeAppointment,
    downloadAppointment,
  };
}
