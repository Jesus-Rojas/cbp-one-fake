import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { LoginDto } from '../dtos/login.dto';
import { RoleType } from '@cbp-one-fake/api-interfaces';
import { AuthorizedFor } from '../../auth/decorators/authorized-for.decorator';
import { Public } from '../../auth/decorators/public.decorator';

@Controller('login')
@AuthorizedFor(RoleType.User, RoleType.Admin)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @Public()
  public login(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto);
  }

  @Get('me')
  public me() {
    return;
  }
}
