import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { AuthUserService } from '../services/auth-user.service';
import { RegisterDto } from '../../register/dtos/register.dto';
import { RoleType } from '@cbp-one-fake/api-interfaces';
import { AuthorizedFor } from '../../auth/decorators/authorized-for.decorator';

@Controller('auth-user')
@AuthorizedFor(RoleType.Admin)
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
