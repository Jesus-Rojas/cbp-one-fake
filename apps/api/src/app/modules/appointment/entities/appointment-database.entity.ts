import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AppointmentDatabase } from '../types/appointment.interface';

@Entity({ name: 'appointments' })
export class AppointmentEntity implements AppointmentDatabase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'datetime'
  })
  dateTime: Date;

  @Column()
  email: string;

  @Column()
  place: string;

  @Column({
    default: JSON.stringify('[]'),
  })
  travelers: string;
}
