import { WeeklyReport, MonthlyReport, DaySummary } from '@/types/report.types';

export function formatDaySummary(summary: DaySummary): Record<string, unknown> {
  return {
    data: summary.date,
    diaSemana: summary.dayOfWeek,
    entrada: summary.firstCheckIn ? summary.firstCheckIn.toLocaleTimeString('pt-BR') : null,
    saida: summary.lastCheckOut ? summary.lastCheckOut.toLocaleTimeString('pt-BR') : null,
    horasTrabalhadas: Number(summary.hoursWorked.toFixed(2)),
    status: summary.status,
  };
}

export function formatWeeklyReport(report: WeeklyReport): Record<string, unknown> {
  return {
    usuario: {
      id: report.userId,
      nome: report.userName,
    },
    periodo: {
      dataInicio: report.startDate,
      dataFim: report.endDate,
    },
    estatisticas: {
      horasTotais: Number(report.totalHoursWorked.toFixed(2)),
      diasPresente: report.daysPresent,
      diasAusente: report.daysAbsent,
    },
    registrosDiarios: report.dailySummaries.map(formatDaySummary),
  };
}

export function formatMonthlyReport(report: MonthlyReport): Record<string, unknown> {
  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  return {
    usuario: {
      id: report.userId,
      nome: report.userName,
    },
    periodo: {
      mes: meses[report.month - 1],
      ano: report.year,
    },
    estatisticas: {
      horasTotais: Number(report.totalHoursWorked.toFixed(2)),
      diasPresente: report.daysPresent,
      diasAusente: report.daysAbsent,
      diasUteisMes: report.totalDaysInMonth,
    },
    registrosDiarios: report.dailySummaries.map(formatDaySummary),
  };
}
