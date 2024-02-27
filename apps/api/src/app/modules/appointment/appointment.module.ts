import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppointmentController } from './controllers/appointment.controller';
import { AppointmentEntity } from './entities/appointment-database.entity';
import { AppointmentService } from './services/appointment.service';
import { AuthUserModule } from '../auth-user/auth-user.module';
import { PdfService } from './services/pdf.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AppointmentEntity
    ]),
    AuthUserModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, PdfService],
})
export class AppointmentModule {}
