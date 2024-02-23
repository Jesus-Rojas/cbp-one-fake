import { Module } from '@nestjs/common';

import { RegisterController } from './controllers/register.controller';
import { RegisterService } from './services/register.service';
import { AuthModule } from '../auth/auth.module';
import { AuthUserModule } from '../auth-user/auth-user.module';

@Module({
  imports: [AuthUserModule, AuthModule],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
