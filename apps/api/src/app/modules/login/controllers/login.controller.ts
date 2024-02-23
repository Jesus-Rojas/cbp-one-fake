import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { LoginDto } from '../dtos/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  public login(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto);
  }
}
