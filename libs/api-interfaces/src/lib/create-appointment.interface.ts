import { Appointment } from "./appointment.interface";

export interface CreateAppointment extends Omit<Appointment, 'id'> { }