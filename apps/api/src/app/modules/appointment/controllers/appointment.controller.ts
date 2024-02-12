import { Controller, Get } from '@nestjs/common';
import { AppointmentService } from '../services/appointment.service';

@Controller('appointments')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Get()
  getData() {
    return this.appointmentService.getAll();
  }
}
