import { db } from '@/db/db.connection';
import { timeEntries } from '@/db/schema/times-entries.schema';
import { eq, desc, and, between, sql } from 'drizzle-orm';
import { NewTimeEntry } from '@/types/times-entries.types';

export class TimeEntryRepository {
  async create(data: NewTimeEntry) {
    const [entry] = await db.insert(timeEntries).values(data).returning();
    return entry;
  }

  async findByUserId(userId: string) {
    const entries = await db.select().from(timeEntries).where(eq(timeEntries.user_id, userId));
    return entries;
  }

  async getLastByUserId(userId: string) {
    const [lastEntry] = await db
      .select()
      .from(timeEntries)
      .where(eq(timeEntries.user_id, userId))
      .orderBy(desc(timeEntries.timestamp))
      .limit(1);

    return lastEntry;
  }

  async getUserShiftHistory(userId: string, limit = 10, offset = 0) {
    const entries = await db
      .select()
      .from(timeEntries)
      .where(eq(timeEntries.user_id, userId))
      .orderBy(desc(timeEntries.timestamp))
      .limit(limit)
      .offset(offset);

    return entries;
  }

  async getWeeklyReport(userId: string, startDate: Date, endDate: Date) {
    const entries = await db
      .select()
      .from(timeEntries)
      .where(
        and(
          eq(timeEntries.user_id, userId),
          between(timeEntries.timestamp, startDate, endDate)
        )
      )
      .orderBy(timeEntries.timestamp);

    return entries;
  }

  async getMonthlyReport(userId: string, year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    endDate.setHours(23, 59, 59, 999);

    const entries = await db
      .select()
      .from(timeEntries)
      .where(
        and(
          eq(timeEntries.user_id, userId),
          between(timeEntries.timestamp, startDate, endDate)
        )
      )
      .orderBy(timeEntries.timestamp);

    return entries;
  }

  async getDailySummary(userId: string, startDate: Date, endDate: Date) {
    const result = await db.execute(sql`
      WITH check_ins AS (
        SELECT 
          DATE_TRUNC('day', timestamp) as day,
          timestamp as check_in_time
        FROM ${timeEntries}
        WHERE user_id = ${userId}
          AND type = 'check-in'
          AND timestamp BETWEEN ${startDate} AND ${endDate}
      ),
      check_outs AS (
        SELECT 
          DATE_TRUNC('day', timestamp) as day,
          timestamp as check_out_time
        FROM ${timeEntries}
        WHERE user_id = ${userId}
          AND type = 'check-out'
          AND timestamp BETWEEN ${startDate} AND ${endDate}
      )
      SELECT 
        ci.day,
        MIN(ci.check_in_time) as first_check_in,
        MAX(co.check_out_time) as last_check_out,
        EXTRACT(EPOCH FROM (MAX(co.check_out_time) - MIN(ci.check_in_time)))/3600 as hours_worked
      FROM check_ins ci
      LEFT JOIN check_outs co ON DATE_TRUNC('day', ci.day) = DATE_TRUNC('day', co.day)
      GROUP BY ci.day
      ORDER BY ci.day
    `);

    return result.rows;
  }
}

export default new TimeEntryRepository();
