import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Login } from '@cbp-one-fake/api-interfaces';

export class LoginDto implements Login {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  readonly password: string;
}
