import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { DATA_SOURCE_CONFIG } from './modules/database/constants/data-source-config';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './modules/login/login.module';
import { RegisterModule } from './modules/register/register.module';
import { AuthUserModule } from './modules/auth-user/auth-user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(DATA_SOURCE_CONFIG),
    AppointmentModule,
    LoginModule,
    RegisterModule,
    AuthUserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
