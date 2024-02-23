import { Injectable } from '@nestjs/common';
import { AuthUserService } from '../../auth-user/services/auth-user.service';
import { Login } from '@cbp-one-fake/api-interfaces';

@Injectable()
export class RegisterService {
  constructor(
    private readonly authUserService: AuthUserService,
  ) {}

  async register(authUser: Login) {
    return this.authUserService.create(authUser);
  }
}
