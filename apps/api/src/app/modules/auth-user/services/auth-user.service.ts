import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUser } from '../entities/auth-user.entity';
import * as bcrypt from 'bcrypt';
import { Errors, Login } from '@cbp-one-fake/api-interfaces';

@Injectable()
export class AuthUserService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly authUserRepository: Repository<AuthUser>
  ) {}

  async create({ username, password }: Login) {
    const userHasBeenCreated = await this.authUserRepository.count({
      where: { username },
    });

    if (userHasBeenCreated) throw new ConflictException(Errors.AUTH_USER_FOUND);

    this.authUserRepository.save({
      password: bcrypt.hashSync(password, 8),
      username,
    });
  }

  findByUsername(username: string) {
    return this.authUserRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findById(id: number): Promise<AuthUser> {
    const user = await this.authUserRepository.findOne({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException(Errors.AUTH_USER_NOT_FOUND);
    }
    
    return user;
  }

  checkPassword(password: string, attemptPass: string) {
    return bcrypt.compare(attemptPass, password);
  }
}
