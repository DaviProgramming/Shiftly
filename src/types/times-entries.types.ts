import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { timeEntries } from '@db/schema/times-entries.schema';

export type TimeEntry = InferSelectModel<typeof timeEntries>;

export type NewTimeEntry = InferInsertModel<typeof timeEntries>;

export type TimeEntryInput = {
  type: 'check-in' | 'check-out';
  timestamp?: Date;
  latitude?: number;
  longitude?: number;
};

export type TimeEntryWithUser = TimeEntry & {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}; 