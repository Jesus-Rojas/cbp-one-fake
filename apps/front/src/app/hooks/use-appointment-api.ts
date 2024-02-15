import { useCallback } from 'react';
import { Appointment } from '@cbp-one-fake/api-interfaces';
import { useLoading } from './use-loading';
import { sleep } from '../helpers/sleep';
import { useAppointment } from './use-appointment';

function useAppointmentApi() {
  const { setIsLoading } = useLoading();
  const { setAppointment } = useAppointment();

  const getAppointment = useCallback(async () => {
    setIsLoading(true);
    await sleep();
    try {
      const response = await fetch(
        `${process.env['NX_URL_API']}/appointments/${localStorage.getItem(
          'CBP_ONE_CODE'
        )}`
      );
      const appointment: Appointment = await response.json();
      setAppointment(appointment);
      setIsLoading(false);
      return appointment;
    } catch (error) {
      setIsLoading(false);
      return {} as Appointment;
    }
  }, []);

  return { getAppointment };
}

export { useAppointmentApi };
