import { users } from './schema/user.schema';
import { Pool } from 'pg';
import appConfig from '../configs/app.config';
import { drizzle } from 'drizzle-orm/node-postgres';

const pool = new Pool({
  connectionString: appConfig.databaseUrl,
  ssl: false,
});

export const db = drizzle(pool, {
  schema: {
    users,
  },
});
