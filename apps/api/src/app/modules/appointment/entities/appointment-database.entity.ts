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
  code: string;

  @Column()
  place: string;

  @Column({
    type: 'text',
  })
  travelers: string;
}
