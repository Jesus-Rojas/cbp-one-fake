import { useCallback } from 'react';
import { Appointment } from '@cbp-one-fake/api-interfaces';
import { useLoading } from './use-loading';
import { sleep } from '../helpers/sleep';
import { useAppointment } from './use-appointment';

function useAppointmentApi() {
  const { open: openLoading, close: closeLoading } = useLoading();
  const { setAppointment } = useAppointment();

  const getAppointment = useCallback(async () => {
    openLoading();
    await sleep(500);
    const code = localStorage.getItem('CBP_ONE_CODE');
    try {
      const response = await fetch(`/api/appointments/${code}/valid`);
      const appointment: Appointment = await response.json();
      setAppointment(appointment);
      closeLoading();
      return appointment;
    } catch (error) {
      closeLoading();
      return {} as Appointment;
    }
  }, []);

  return { getAppointment };
}

export { useAppointmentApi };
