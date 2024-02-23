import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUserService } from './services/auth-user.service';
import { AuthUser } from './entities/auth-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthUser])],
  providers: [AuthUserService],
  exports: [AuthUserService],
})
export class AuthUserModule {}
