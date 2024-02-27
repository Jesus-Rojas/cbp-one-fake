import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUserService } from './services/auth-user.service';
import { AuthUser } from './entities/auth-user.entity';
import { AuthUserController } from './controllers/auth-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AuthUser])],
  controllers: [AuthUserController],
  providers: [AuthUserService],
  exports: [AuthUserService],
})
export class AuthUserModule {}
