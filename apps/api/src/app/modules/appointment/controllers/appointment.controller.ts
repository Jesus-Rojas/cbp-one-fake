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
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { AppointmentService } from '../services/appointment.service';
import { Payload } from '../../auth/decorators/payload.decorator';
import { AuthorizedFor } from '../../auth/decorators/authorized-for.decorator';

@Controller('appointments')
@AuthorizedFor(RoleType.Admin)
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Get('me')
  @AuthorizedFor(RoleType.User)
  getMe(@Payload() payload: AuthUser) {
    return this.appointmentService.getMe(payload.username);
  }

  @Get('')
  getAll() {
    return this.appointmentService.getAll();
  }

  @Post()
  create(@Body() appointment: Appointment) {
    return this.appointmentService.create(appointment);
  }

  @Get(':id/download')
  async downloadById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const pdfBuffer = await this.appointmentService.downloadById(+id);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="appointment-${id}_${Date.now()}.pdf"`,
      'Content-Length': pdfBuffer.length,
    });

    res.end(pdfBuffer);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.getOneById(+id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.delete(+id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() appointment: Appointment
  ) {
    return this.appointmentService.update(+id, appointment);
  }
}
