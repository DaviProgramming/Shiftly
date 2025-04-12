import { Router } from 'express';
import ReportController from '@/controllers/report/report.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';

const reportRouter = Router();

reportRouter.use(authMiddleware);

reportRouter.get('/weekly/:userId', ReportController.getWeeklyReport);

reportRouter.get('/monthly/:userId', ReportController.getMonthlyReport);

export default reportRouter; 