import { timeEntries } from '@db/schema/times-entries.schema';

export interface TimeEntryResource {
  id: string;
  userId: string;
  type: string;
  timestamp: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export function formatTimeEntry(entry: typeof timeEntries.$inferSelect): TimeEntryResource {
  const resource: TimeEntryResource = {
    id: entry.id,
    userId: entry.user_id,
    type: entry.type,
    timestamp: entry.timestamp.toISOString(),
  };

  if (entry.latitude && entry.longitude) {
    resource.location = {
      latitude: entry.latitude,
      longitude: entry.longitude,
    };
  }

  return resource;
}

export function formatTimeEntries(entries: (typeof timeEntries.$inferSelect)[]): TimeEntryResource[] {
  return entries.map(formatTimeEntry);
}

export function formatTimeEntryWithUser(entry: typeof timeEntries.$inferSelect & { user?: { name: string; email: string } }): TimeEntryResource & { user?: { name: string; email: string } } {
  const formattedEntry = formatTimeEntry(entry);
  
  if (entry.user) {
    return {
      ...formattedEntry,
      user: {
        name: entry.user.name,
        email: entry.user.email
      }
    };
  }
  
  return formattedEntry;
} 