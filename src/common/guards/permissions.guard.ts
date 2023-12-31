import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PERMISSIONS_KEY } from './permissions.decorator';
import { IDENTITY_KEY } from './identity.decorator';

const extractTokenFromHeaders = (req: any) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) {
      return true;
    }


    const request = context.switchToHttp().getRequest();

    const authToken = extractTokenFromHeaders(request);
    if (!authToken) {
      throw new UnauthorizedException();
    }

    try {
      const claims = await this.jwtService.verifyAsync(
        authToken,
        {
          secret: process.env.SECRETE_KEY
        }
      );

      /**
       * Validate permissions from jwt claims
       */
      let permitted = false;
      for (const permission of requiredPermissions) {
        const found = claims.permissions.find((perm: string) => perm == permission);

        if (found) {
          permitted = true;
          break;
        }
      }
      if (!permitted) {
        throw new UnauthorizedException('Not Authorized');
      }


    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
