import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


// - email
// - date
// - time
// - place
// - travelers [{ name, birthday, numberOfConfirmation }]

@Entity({
  name: 'appointments'
})
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'datetime'
  })
  date: Date;

  @Column()
  email: string;

  @Column()
  place: string;

  @Column({
    default: JSON.stringify('[]'),
  })
  travelers: string;
}
