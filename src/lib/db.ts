import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Ensure fetch protocol is configured for HTTPS serverless queries
neonConfig.fetchConnectionCache = true;

const connectionString = process.env.DATABASE_URL!;

export const sql = neon(connectionString);
export const db = drizzle(sql);
