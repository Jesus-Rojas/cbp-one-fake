import { Appointment } from '@cbp-one-fake/api-interfaces';

export interface AppointmentDatabase extends Omit<Appointment, 'travelers'> {
  travelers: string;
}