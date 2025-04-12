export interface DaySummary {
  date: string;
  dayOfWeek: string;
  firstCheckIn: Date | null;
  lastCheckOut: Date | null;
  hoursWorked: number;
  status: 'presente' | 'ausente' | 'incompleto';
}

export interface WeeklyReport {
  userId: string;
  userName: string;
  startDate: string;
  endDate: string;
  totalHoursWorked: number;
  daysPresent: number;
  daysAbsent: number;
  dailySummaries: DaySummary[];
}

export interface MonthlyReport {
  userId: string;
  userName: string;
  year: number;
  month: number;
  totalHoursWorked: number;
  daysPresent: number;
  daysAbsent: number;
  totalDaysInMonth: number;
  dailySummaries: DaySummary[];
}

export interface DailyTimeRecord {
  day: string;
  first_check_in: string | null;
  last_check_out: string | null;
  hours_worked: number | string;
}
