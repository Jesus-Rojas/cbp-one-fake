import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthUserModule } from '../auth-user/auth-user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizedForGuard } from './guards/authorized-for.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    AuthUserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizedForGuard,
    },
    AuthService,
    JwtStrategy,
  ],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
