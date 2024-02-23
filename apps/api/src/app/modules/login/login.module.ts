import { Module } from '@nestjs/common';
import { LoginService } from './services/login.service';
import { LoginController } from './controllers/login.controller';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { AuthUserModule } from '../auth-user/auth-user.module';

@Module({
  imports: [AuthUserModule, ConfigModule.forRoot(), AuthModule],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
