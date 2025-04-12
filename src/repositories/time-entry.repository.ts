import { db } from '@/db/db.connection';
import { timeEntries } from '@/db/schema/times-entries.schema';
import { eq, desc } from 'drizzle-orm';
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
}

export default new TimeEntryRepository();
