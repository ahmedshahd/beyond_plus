import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.header?.('api-key');

    if (req?.url?.includes('/graphql')) {
      return next();
    }
    if (req?.url?.includes('/bull')) {
      return next();
    }
    if (req?.url?.includes('/upload')) {
      return next();
    }

    if (!apiKey) {
      throw new HttpException('api key not found', HttpStatus.UNAUTHORIZED);
    }

    if (apiKey != process.env.API_KEY) {
      throw new HttpException('api key is wrong', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}
