import { Appointment, AuthUser, RoleType } from '@cbp-one-fake/api-interfaces';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { AppointmentService } from '../services/appointment.service';
import { Payload } from '../../auth/decorators/payload.decorator';
import { AuthorizedFor } from '../../auth/decorators/authorized-for.decorator';

@Controller('appointments')
@AuthorizedFor(RoleType.Admin)
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Get('me')
  @AuthorizedFor(RoleType.User)
  async getMe(@Payload() payload: AuthUser) {
    return this.appointmentService.getMe(payload.username);
  }

  @Get('')
  getAll() {
    return this.appointmentService.getAll();
  }

  @Post()
  createAppointment(@Body() appointment: Appointment) {
    return this.appointmentService.create(appointment);
  }

  @Get(':id')
  async getAppointmentById(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.getOneById(+id);
  }

  @Delete(':id')
  async deleteAppointment(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.delete(+id);
  }

  @Put(':id')
  async updateAppointment(
    @Param('id', ParseIntPipe) id: number,
    @Body() appointment: Appointment
  ) {
    return this.appointmentService.update(+id, appointment);
  }
}
