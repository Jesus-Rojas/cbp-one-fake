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

  getAll() {
    return this.appointmentRepository.find();
  }
}
