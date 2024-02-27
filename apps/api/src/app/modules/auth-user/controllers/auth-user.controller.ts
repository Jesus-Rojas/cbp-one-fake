import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthUserService } from '../services/auth-user.service';
import { RegisterDto } from '../../register/dtos/register.dto';

@Controller('auth-user')
@UseGuards(JwtAuthGuard)
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post()
  public createAuthUser(@Body() body: RegisterDto) {
    return this.authUserService.create(body);
  }

  @Get()
  getAuthUsersByRoleUser() {
    return this.authUserService.getByRoleUser();
  }

  @Delete(':id')
  async deleteAuthUser(@Param('id', ParseIntPipe) id: number) {
    return this.authUserService.delete(+id);
  }
}
