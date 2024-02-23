import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuthUser as IAuthUser } from '@cbp-one-fake/api-interfaces';

@Entity()
export class AuthUser implements IAuthUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    nullable: true,
    length: 60,
  })
  password: string;
}
