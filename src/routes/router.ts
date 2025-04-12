import { Router } from 'express';
import authRoutes from '@/routes/auth/auth.routes';
import shiftRoutes from '@/routes/shift/shift.routes';

const router: Router = Router();

router.use('/auth', authRoutes, shiftRoutes);
router.use('/shifts', shiftRoutes);

export default router;
