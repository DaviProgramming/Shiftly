import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '@/utils/app.error';
import jwt, { JwtPayload } from 'jsonwebtoken';
import appConfig from '@/configs/app.config';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('Token não fornecido');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, appConfig.jwtSecret) as JwtPayload;
    req.userId = decoded.userId;

    next();
  } catch {
    throw new UnauthorizedError('Token inválido');
  }
};
