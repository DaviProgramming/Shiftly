import { Router } from 'express';
import ReportController from '@/controllers/report/report.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';

const reportRouter = Router();

reportRouter.use(authMiddleware);

reportRouter.get('/weekly/:userId', ReportController.getWeeklyReport);
reportRouter.get('/weekly/:userId/csv', ReportController.getWeeklyReportCSV);

reportRouter.get('/monthly/:userId', ReportController.getMonthlyReport);
reportRouter.get('/monthly/:userId/csv', ReportController.getMonthlyReportCSV);

export default reportRouter;
