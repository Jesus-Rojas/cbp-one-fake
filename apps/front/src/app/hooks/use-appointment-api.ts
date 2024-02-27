import { Appointment } from '@cbp-one-fake/api-interfaces';
import { useHttpClient } from '@cbp-one-fake/http-client-front';
import { useNavigate } from 'react-router-dom';
import { useAccessToken } from './use-access-token';

function useAppointmentApi() {
  const navigate = useNavigate();
  const { accessToken } = useAccessToken();
  const { get } = useHttpClient({
    config: {
      baseURL: '/api/appointments/me',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    },
    onError: () => navigate('/home'),
  });

  return {
    getMe: () => get<Appointment>('')
  };
}

export { useAppointmentApi };
