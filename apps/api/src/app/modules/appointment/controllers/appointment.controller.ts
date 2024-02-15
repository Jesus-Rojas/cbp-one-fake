import { Controller, Get, Param } from '@nestjs/common';
import { AppointmentService } from '../services/appointment.service';

@Controller('appointments')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Get(':code')
  getOneByCode(
    @Param('code') code: string,
  ) {
    return this.appointmentService.getOneByCode(code);
  }
}
