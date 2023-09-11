import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
const jwt = require('jsonwebtoken');

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

const authorizeTokenAndGetClaims = (request: any) => {
  /**
   * Extract token from headers or query
   * Throw exception if token not found
   */
  const authToken = extractTokenFromHeaders(request);
  if (!authToken) {
    throw new UnauthorizedException('Token not given!');
  }

  /**
   * Verify token and get claims
   * Throw exception if token is not validated
   */
  let claims = undefined;
  try {
    claims = jwt.verify(authToken, process.env.SECRETE_KEY);
  } catch (error) {
    throw new UnauthorizedException('Token not valid!');
  }

  return claims;
};

const authorizePermissions = (permissions: string[] | null, claims: any) => {
  /**
   * Validate permissions from jwt claims
   */
  let permitted = false;
  for (const permission of permissions) {
    const found = claims.permissions.find((perm: string) => perm == permission);
    if (found) {
      permitted = true;
      break;
    }
  }
  if (!permitted) {
    throw new UnauthorizedException('Not Authorized');
  }
};

const authorizeSubject = (
  options?: { path?: string; query?: string; sub?: string },
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
  if (options.sub) {
    claimSub = claims[options.sub];
  }

  /**
   * Authorize sub
   */
  if (sub && sub != claimSub) {
    throw new UnauthorizedException('Unauthorized!');
  }
};

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private permissions: string[] | null,
    private options?: {
      path?: string;
      query?: string;
      sub?: string;
      should_owner?: boolean;
    },
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    /**
     * Authorize token and get claims
     */

    const claims = authorizeTokenAndGetClaims(request);

    /**
     * Authorize permissions
     */
    if (this.permissions) {
      authorizePermissions(this.permissions, claims);
    }

    /**
     * Authorize subject
     */
    if (this.options) {
      authorizeSubject(this.options, claims, request);
    }

    /**
     * Authorize if is owner
     */
    if (this.options.should_owner && claims.is_owner != true) {
      throw new UnauthorizedException('Not Authorized!');
    }

    return true;
  }
}
