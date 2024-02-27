import { Appointment } from '@cbp-one-fake/api-interfaces';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentEntity } from '../entities/appointment-database.entity';
import { AppointmentDatabase } from '../types/appointment.interface';
import { AuthUserService } from '../../auth-user/services/auth-user.service';

@Injectable()
export class AppointmentService {
  constructor (
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
    private readonly authUserService: AuthUserService,
  ) { }

  parseAppointments(appointments: AppointmentDatabase[]) {
    return appointments.map(this.parseAppointment);
  }

  parseAppointment(appointment: AppointmentDatabase) {
    appointment.travelers = JSON.parse(appointment.travelers);
    return appointment;
  }

  async getMe(username: string) {
    const appointment = await this.appointmentRepository.findOneBy({ email: username });
    if (!appointment) throw new NotFoundException('User not found with some appointment');
    return this.parseAppointment(appointment);
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
    if (!appointment) throw new NotFoundException();
    return this.parseAppointment(appointment);
  }

  delete(id: number) {
    this.appointmentRepository.delete(id);
  }

  async update(id: number, data: Partial<Appointment>) {
    const appointment = await this.getOneById(id);
    if (!appointment) throw new NotFoundException();
    return this.appointmentRepository.update(
      { id }, 
      {
        ...data,
        travelers: JSON.stringify(data.travelers),
      }
    );
  }
}
