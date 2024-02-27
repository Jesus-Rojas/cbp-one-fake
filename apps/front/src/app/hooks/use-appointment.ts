import { Appointment } from "@cbp-one-fake/api-interfaces";
import { useAtom, atom } from "jotai";
import { useLoading } from "./use-loading";
import { useAppointmentApi } from "./use-appointment-api";

const appointmentAtom = atom<Appointment>({} as Appointment);

export function useAppointment() {
  const [appointment, setAppointment] = useAtom(appointmentAtom);
  const { open: openLoading, close: closeLoading } = useLoading();
  const { getMe } = useAppointmentApi();

  const getAppointment = async () => {
    openLoading();
    try {
      const appointment = await getMe();
      setAppointment(appointment);
    } catch {
      // 
    }
    closeLoading();
  };

  return {
    appointment,
    getAppointment,
  };
}
