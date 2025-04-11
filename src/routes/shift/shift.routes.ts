import { Router } from 'express';
import ShiftController from '@/controllers/shift/shift.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { validateRequest } from '@/middlewares/validate-request.middleware';
import { shiftValidationSchema } from '@validations/shift.validation';

const router = Router();

router.post(
  '/start',
  authMiddleware,
  validateRequest(shiftValidationSchema),
  ShiftController.startShift
);

router.post(
  '/end',
  authMiddleware,
  validateRequest(shiftValidationSchema),
  ShiftController.endShift
);

router.get('/current', authMiddleware, ShiftController.getCurrentShift);

router.get('/history', authMiddleware, ShiftController.getShiftHistory);

export default router;
