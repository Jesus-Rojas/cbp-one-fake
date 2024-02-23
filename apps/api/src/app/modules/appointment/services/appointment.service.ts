import { Appointment } from '@cbp-one-fake/api-interfaces';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentEntity } from '../entities/appointment-database.entity';
import { AppointmentDatabase } from '../types/appointment.interface';

@Injectable()
export class AppointmentService {
  constructor (
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>
  ) { }

  parseAppointments(appointments: AppointmentDatabase[]) {
    return appointments.map((appointment) => {
      appointment.travelers = JSON.parse(appointment.travelers);
      return appointment;
    });
  }

  async getOneByCode(code: string) {
    const appointment = await this.appointmentRepository.findOneBy({ code });
    if (!(appointment && appointment.id)) return;
    return this.parseAppointments([appointment])[0];
  }

  async getAll() {
    const appointments = await this.appointmentRepository.find();
    return this.parseAppointments(appointments);
  }

  create(appointment: Appointment) {
    this.appointmentRepository.save({
      ...appointment,
      travelers: JSON.stringify(appointment.travelers)
    })
  }

  async getOneById(id: number) {
    const appointment = await this.appointmentRepository.findOneBy({ id });
    if (!(appointment && appointment.id)) return;
    return this.parseAppointments([appointment])[0];
  }

  delete(id: number) {
    this.appointmentRepository.delete(id);
  }

  async update(id: number, data: Partial<Appointment>) {
    const appointment = await this.getOneById(id);
    if (!appointment) {
      throw new NotFoundException();
    }
    return this.appointmentRepository.update(
      { id }, 
      {
        ...data,
        travelers: JSON.stringify(data.travelers),
      }
    );
  }
}
