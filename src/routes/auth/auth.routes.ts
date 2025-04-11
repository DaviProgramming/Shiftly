import { Router, RequestHandler } from 'express';
import AuthController from '@/controllers/auth/auth.controller';
import { validateRequest } from '@/middlewares/validate-request.middleware';
import { createUserSchema, loginSchema } from '@/validations/user.validation';
import { authMiddleware } from '@/middlewares/auth.middleware';

const router = Router();

router.post(
  '/register',
  validateRequest(createUserSchema) as RequestHandler,
  AuthController.register
);

router.post(
  '/login', 
  validateRequest(loginSchema) as RequestHandler, 
  AuthController.login
);

router.get('/me', authMiddleware, AuthController.me);

export default router;
