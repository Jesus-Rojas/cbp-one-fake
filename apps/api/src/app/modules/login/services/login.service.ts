import { Errors } from '@cbp-one-fake/api-interfaces';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthUserService } from '../../auth-user/services/auth-user.service';
import { LoginDto } from '../dtos/login.dto';
import { AuthUser } from '../../auth-user/entities/auth-user.entity';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly authUsersService: AuthUserService,
    private readonly authService: AuthService
  ) {}

  public async login(loginDto: LoginDto) {
    const user: AuthUser = await this.authUsersService.findByUsername(
      loginDto.username
    );

    if (!user) throw new UnauthorizedException(Errors.AUTH_USER_NOT_FOUND);

    const match = await this.authUsersService.checkPassword(
      user.password,
      loginDto.password
    );

    if (!match) throw new UnauthorizedException(Errors.WRONG_PASSWORD);

    return this.authService.loginResponse(user);
  }
}
