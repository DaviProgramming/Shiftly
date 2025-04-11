import { Request as _Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
} 
