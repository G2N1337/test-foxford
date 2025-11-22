import { defineConfig } from 'prisma/config';
import path from 'node:path';
import { config as loadEnv } from 'dotenv';

loadEnv({ path: path.join(process.cwd(), '.env') });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  engine: 'classic',
  datasource: {
    url: process.env.DATABASE_URL || '',
  },
});
