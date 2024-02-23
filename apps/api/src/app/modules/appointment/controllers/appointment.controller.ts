import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AppointmentService } from '../services/appointment.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Appointment } from '@cbp-one-fake/api-interfaces';

@Controller('appointments')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Get(':code/valid')
  getAppointmentByCode(
    @Param('code') code: string,
  ) {
    return this.appointmentService.getOneByCode(code);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.appointmentService.getAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createAppointment(
    @Body() appointment: Appointment,
  ) {
    return this.appointmentService.create(appointment);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getAppointmentById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.appointmentService.getOneById(+id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePartner(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.delete(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updatePartner(
    @Param('id', ParseIntPipe) id: number,
    @Body() appointment: Appointment,
  ) {
    return this.appointmentService.update(+id, appointment);
  }
}
