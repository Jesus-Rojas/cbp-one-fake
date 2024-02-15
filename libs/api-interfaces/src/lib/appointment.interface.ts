import { Traveler } from "./traveler.interface";

export interface Appointment {
  id: number;
  email: string;
  dateTime: Date;
  place: string;
  code: string;
  travelers: Traveler[];
}