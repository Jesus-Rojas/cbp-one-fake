import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { RegisterDto } from '../dtos/register.dto';

@Controller()
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registerUserDto: RegisterDto,
  ) {
    return this.registerService.register(registerUserDto);
  }
}
