import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { DATA_SOURCE_CONFIG } from './modules/database/constants/data-source-config';

@Module({
  imports: [
    TypeOrmModule.forRoot(DATA_SOURCE_CONFIG),
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
