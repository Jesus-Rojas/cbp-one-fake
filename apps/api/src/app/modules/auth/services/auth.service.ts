import { AuthUser, JwtPayload, LoginResponse } from '@cbp-one-fake/api-interfaces';
import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  createAccessToken(user: AuthUser) {
    const payload: Partial<JwtPayload> = {
      userId: user.id,
      role: user.role,
      username: user.username
    };
    return sign(payload, process.env.JWT_SECRET.toString(), {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  async loginResponse(user: AuthUser): Promise<LoginResponse> {
    return {
      expiresIn: process.env.JWT_EXPIRATION,
      user: {
        username: user.username,
      },
      accessToken: this.createAccessToken(user),
    };
  }
}
