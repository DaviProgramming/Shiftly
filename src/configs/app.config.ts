import dotenv from 'dotenv';

dotenv.config();

const createDatabaseUrl = (): string => {
  const host = process.env.DATABASE_HOST || 'localhost';
  const port = process.env.DATABASE_PORT || '5432';
  const user = process.env.DATABASE_USER || 'postgres';
  const password = process.env.DATABASE_PASSWORD || 'senha';
  const database = process.env.DATABASE_NAME || 'shiftly';

  return `postgresql://${user}:${password}@${host}:${port}/${database}`;
};

export const appConfig = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: createDatabaseUrl(),
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiration: process.env.JWT_EXPIRATION || '1h',
  jwtRefreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION || '7d',
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || '',
};

export default appConfig;
