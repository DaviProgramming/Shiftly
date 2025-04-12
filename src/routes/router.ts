import { Router } from 'express';
import authRoutes from '@/routes/auth/auth.routes';
import shiftRoutes from '@/routes/shift/shift.routes';
import reportRoutes from '@/routes/report.routes';

const router: Router = Router();

router.use('/auth', authRoutes);
router.use('/shifts', shiftRoutes);
router.use('/reports', reportRoutes);

export default router;
