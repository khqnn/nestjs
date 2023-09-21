import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
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


const authorizeSubject = (
  options?: { path?: string; query?: string; id?: string },
  claims?: any,
  request?: any,
) => {
  let sub = undefined;
  let claimSub = undefined;

  /**
   * Fetch subject from path params
   */
  if (options && options.path) {
    sub = request.params[options.path];
  }

  /**
   * Fetch subject from query params
   */
  if (options && options.query) {
    sub = request.query[options.query];
  }

  /**
   * Fetch subject from claims
   */
  if (options.id) {
    claimSub = claims[options.id];
  }

  console.log(sub, claimSub);
  
  /**
   * Authorize sub
   */
  if (sub && sub != claimSub) {
    throw new UnauthorizedException('Unauthorized!');
  }
};

@Injectable()
export class IdentityGuard implements CanActivate{
  constructor(private reflector: Reflector, private jwtService: JwtService) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const options = this.reflector.getAllAndOverride<Object>(IDENTITY_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

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

      console.log(options, claims);
      
      authorizeSubject(options, claims, request)

    } catch {
      throw new UnauthorizedException();
    }


    return true;
  }

}

