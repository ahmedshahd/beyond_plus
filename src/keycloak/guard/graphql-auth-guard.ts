import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { KeycloakAuthService } from '../auth/keycloak-auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class graphQlKeycloakAuthGuard implements CanActivate {
  constructor(private keycloakAuthService: KeycloakAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlCtx = GqlExecutionContext.create(context);
    const request = gqlCtx.getContext().req;

    const header = request.header('Authorization');
    if (!header) {
      throw new HttpException(
        'Authorization: Bearer <token> header missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new HttpException(
        'Authorization: Bearer <token> header invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = parts[1];

    try {
      const response = await this.keycloakAuthService.authorize(token);
      request['user'] = response;
      return true;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
