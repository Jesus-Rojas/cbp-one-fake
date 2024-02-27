import { Appointment, AuthUser, JwtPayload } from '@cbp-one-fake/api-interfaces';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as RequestExpress } from 'express';

import { AppointmentService } from '../services/appointment.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Get('me')
  async getMe(@Request() req: RequestExpress) {
    return this.appointmentService.getMe((req.user as AuthUser).username);
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
