import { pgTable, uuid, timestamp, doublePrecision, varchar } from 'drizzle-orm/pg-core';
import { users } from '@db/schema/user.schema';
import { relations } from 'drizzle-orm';

export const timeEntries = pgTable('time_entries', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id')
    .notNull()
    .references(() => users.id),
  type: varchar('type', { length: 255 }).notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  latitude: doublePrecision('latitude'),
  longitude: doublePrecision('longitude'),
});

export const timeEntriesRelations = relations(timeEntries, ({ one }) => ({
  user: one(users, {
    fields: [timeEntries.user_id],
    references: [users.id],
  }),
}));
