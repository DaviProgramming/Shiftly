import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/app.error';
import { ZodError } from 'zod';
import { NotFoundError } from '@/utils/app.error';
import { PostgresError } from '@/interfaces/postgres.interface';

export const errorHandler = (
  err: Error | AppError | PostgresError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  if (res.headersSent) {
    return next(err);
  }
  
  if (err instanceof ZodError) {
    const errors = err.errors.map(error => ({
      campo: error.path.join('.'),
      mensagem: error.message
    }));
    
    return res.status(400).json({
      status: 'erro',
      message: 'Erro de validação',
      errors
    });
  }
  
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'erro',
      message: err.message,
      ...(err.errors && { errors: err.errors }),
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }
  
  if ('code' in err && err.code === '23505') {
    const match = err.detail?.match(/\((.*?)\)=/);
    const field = match ? match[1] : 'campo';
    
    return res.status(409).json({
      status: 'erro',
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} já está em uso`,
      campo: field
    });
  }
  
  return res.status(500).json({
    status: 'erro',
    message: 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { 
      error: err.message,
      stack: err.stack
    })
  });
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Rota não encontrada: ${req.method} ${req.originalUrl}`));
};
