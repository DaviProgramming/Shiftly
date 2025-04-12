import { NotFoundError } from '@/utils/app.error';
import UserRepository from '@/repositories/user.repository';
import TimeEntryRepository from '@/repositories/time-entry.repository';
import { DaySummary, WeeklyReport, MonthlyReport, DailyTimeRecord } from '@/types/report.types';

export class ReportService {
  private getWeekDayName(date: Date): string {
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return diasSemana[date.getDay()];
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR');
  }

  private createEmptyDaySummary(date: Date): DaySummary {
    return {
      date: this.formatDate(date),
      dayOfWeek: this.getWeekDayName(date),
      firstCheckIn: null,
      lastCheckOut: null,
      hoursWorked: 0,
      status: 'ausente',
    };
  }

  private processDailySummaries(
    dailyData: DailyTimeRecord[],
    startDate: Date,
    endDate: Date
  ): DaySummary[] {
    const dailySummaries: DaySummary[] = [];
    const dateMap = new Map();

    dailyData.forEach(day => {
      const date = new Date(day.day);
      const formattedDate = this.formatDate(date);

      dateMap.set(formattedDate, {
        date: formattedDate,
        dayOfWeek: this.getWeekDayName(date),
        firstCheckIn: day.first_check_in ? new Date(day.first_check_in) : null,
        lastCheckOut: day.last_check_out ? new Date(day.last_check_out) : null,
        hoursWorked: Number(day.hours_worked) || 0,
        status: day.first_check_in && day.last_check_out ? 'presente' : 'incompleto',
      });
    });

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        const formattedDate = this.formatDate(currentDate);
        if (dateMap.has(formattedDate)) {
          dailySummaries.push(dateMap.get(formattedDate));
        } else {
          dailySummaries.push(this.createEmptyDaySummary(new Date(currentDate)));
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dailySummaries;
  }

  async getWeeklyReport(userId: string, startDate: Date): Promise<WeeklyReport> {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    const dayOfWeek = startDate.getDay();
    if (dayOfWeek !== 1) {
      const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      startDate.setDate(startDate.getDate() - daysToSubtract);
    }
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);

    const dailyData = await TimeEntryRepository.getDailySummary(userId, startDate, endDate);
    const dailySummaries = this.processDailySummaries(
      dailyData as unknown as DailyTimeRecord[],
      startDate,
      endDate
    );

    let totalHoursWorked = 0;
    let daysPresent = 0;
    let daysAbsent = 0;

    dailySummaries.forEach(day => {
      totalHoursWorked += day.hoursWorked;
      if (day.status === 'presente') daysPresent++;
      if (day.status === 'ausente') daysAbsent++;
    });

    return {
      userId,
      userName: user.name,
      startDate: this.formatDate(startDate),
      endDate: this.formatDate(endDate),
      totalHoursWorked,
      daysPresent,
      daysAbsent,
      dailySummaries,
    };
  }

  async getMonthlyReport(userId: string, year: number, month: number): Promise<MonthlyReport> {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    const startDate = new Date(year, month - 1, 1);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(year, month, 0);
    endDate.setHours(23, 59, 59, 999);

    const dailyData = await TimeEntryRepository.getDailySummary(userId, startDate, endDate);
    const dailySummaries = this.processDailySummaries(
      dailyData as unknown as DailyTimeRecord[],
      startDate,
      endDate
    );

    let totalHoursWorked = 0;
    let daysPresent = 0;
    let daysAbsent = 0;

    dailySummaries.forEach(day => {
      totalHoursWorked += day.hoursWorked;
      if (day.status === 'presente') daysPresent++;
      if (day.status === 'ausente') daysAbsent++;
    });

    return {
      userId,
      userName: user.name,
      year,
      month,
      totalHoursWorked,
      daysPresent,
      daysAbsent,
      totalDaysInMonth: dailySummaries.length,
      dailySummaries,
    };
  }
}

export default new ReportService();
