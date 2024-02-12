import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppointmentController } from './controllers/appointment.controller';
import { AppointmentEntity } from './entities/appointment.entity';
import { AppointmentService } from './services/appointment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AppointmentEntity
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
