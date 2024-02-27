import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ROLE_KEY } from '../constants/role-key';
import { AuthUserService } from '../../auth-user/services/auth-user.service';
import { IS_PUBLIC_KEY } from '../constants/is-public-key';
import { JwtPayload, RoleType } from '@cbp-one-fake/api-interfaces';

@Injectable()
export class AuthorizedForGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private authUserService: AuthUserService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic: boolean = this.reflector.get(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) return true;

    const requiredRolesByController: RoleType[] = this.reflector.get(
      ROLE_KEY,
      context.getClass(),
    );

    const requiredRolesByEndpoint: RoleType[] = this.reflector.get(
      ROLE_KEY,
      context.getHandler(),
    );

    const requiredRoles: RoleType[] = [];
    if (requiredRolesByEndpoint) {
      requiredRoles.push(...requiredRolesByEndpoint);
    }

    if (requiredRolesByController) {
      requiredRoles.push(...requiredRolesByController);
    }

    if (!requiredRoles.length) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });
      request['payload'] = payload;

      const user = await this.authUserService.findById(payload.userId);

      if (!user) return false;

      const { role } = user;
      return requiredRoles.some((requiredRole) => requiredRole === role);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
