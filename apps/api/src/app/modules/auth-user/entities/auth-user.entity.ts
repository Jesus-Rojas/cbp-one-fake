import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuthUser as IAuthUser, RoleType } from '@cbp-one-fake/api-interfaces';

@Entity()
export class AuthUser implements IAuthUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.User,
  })
  role: RoleType;

  @Column({
    nullable: true,
    length: 60,
  })
  password: string;
}
