import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { LoginDto } from '../dtos/login.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  public login(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  public me() {
    return;
  }
}
