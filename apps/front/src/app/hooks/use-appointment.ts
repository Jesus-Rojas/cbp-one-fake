import { Appointment } from "@cbp-one-fake/api-interfaces";
import { useAtom, atom } from "jotai";

const appointmentAtom = atom<Appointment>({} as Appointment);

export function useAppointment() {
  const [appointment, setAppointment] = useAtom(appointmentAtom);

  return {
    appointment,
    setAppointment,
  };
}
