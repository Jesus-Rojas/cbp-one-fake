import { Appointment } from '@cbp-one-fake/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentEntity } from '../entities/appointment-database.entity';

@Injectable()
export class AppointmentService {
  constructor (
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>
  ) { }

  async getOneByCode(code: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOneBy({ code });
    if (appointment && appointment.id) {
      appointment.travelers = JSON.parse(appointment.travelers);
    }
    return appointment as unknown as Appointment;
  }
}
