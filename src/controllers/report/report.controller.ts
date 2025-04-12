import { catchAsync } from '@/utils/catch-async.utils';
import { RequestHandler } from 'express';
import ReportService from '@/services/report.service';
import StatusCode from '@/constants/status-code.constants';
import { formatWeeklyReport, formatMonthlyReport } from '@/resources/report.resource';

export class ReportController {
  getWeeklyReport: RequestHandler = catchAsync(async (req, res) => {
    const userId = req.params.userId;
    let startDate: Date;

    if (req.query.startDate) {
      startDate = new Date(req.query.startDate as string);
    } else {
      startDate = new Date();
      const day = startDate.getDay();
      const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
      startDate = new Date(startDate.setDate(diff));
    }

    const report = await ReportService.getWeeklyReport(userId, startDate);

    res.status(StatusCode.OK).json({
      message: 'Relatório semanal gerado com sucesso',
      data: formatWeeklyReport(report),
    });
  });

  getMonthlyReport: RequestHandler = catchAsync(async (req, res) => {
    const userId = req.params.userId;
    let year: number;
    let month: number;

    if (req.query.year && req.query.month) {
      year = parseInt(req.query.year as string);
      month = parseInt(req.query.month as string);
    } else {
      const currentDate = new Date();
      year = currentDate.getFullYear();
      month = currentDate.getMonth() + 1;
    }

    const report = await ReportService.getMonthlyReport(userId, year, month);

    res.status(StatusCode.OK).json({
      message: 'Relatório mensal gerado com sucesso',
      data: formatMonthlyReport(report),
    });
  });
}

export default new ReportController();
