import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL is missing in .env.local');
  process.exit(1);
}

const sql = neon(connectionString);

async function runCustomHttpsMigration() {
  console.log('🚀 Running custom database migrations over HTTPS on Neon Postgres...');

  try {
    // 1. Create "user" table
    await sql`
      CREATE TABLE IF NOT EXISTS "user" (
        "id" TEXT PRIMARY KEY,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL UNIQUE,
        "emailVerified" BOOLEAN NOT NULL DEFAULT FALSE,
        "image" TEXT,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;
    console.log('✓ Created "user" table');

    // 2. Create "session" table
    await sql`
      CREATE TABLE IF NOT EXISTS "session" (
        "id" TEXT PRIMARY KEY,
        "expiresAt" TIMESTAMP NOT NULL,
        "token" TEXT NOT NULL UNIQUE,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "ipAddress" TEXT,
        "userAgent" TEXT,
        "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
      );
    `;
    console.log('✓ Created "session" table');

    // 3. Create "account" table
    await sql`
      CREATE TABLE IF NOT EXISTS "account" (
        "id" TEXT PRIMARY KEY,
        "accountId" TEXT NOT NULL,
        "providerId" TEXT NOT NULL,
        "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
        "accessToken" TEXT,
        "refreshToken" TEXT,
        "idToken" TEXT,
        "accessTokenExpiresAt" TIMESTAMP,
        "refreshTokenExpiresAt" TIMESTAMP,
        "scope" TEXT,
        "password" TEXT,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;
    console.log('✓ Created "account" table');

    // 4. Create "verification" table
    await sql`
      CREATE TABLE IF NOT EXISTS "verification" (
        "id" TEXT PRIMARY KEY,
        "identifier" TEXT NOT NULL,
        "value" TEXT NOT NULL,
        "expiresAt" TIMESTAMP NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      );
    `;
    console.log('✓ Created "verification" table');

    // 5. Create "ticket_listing" table
    await sql`
      CREATE TABLE IF NOT EXISTS "ticket_listing" (
        "id" TEXT PRIMARY KEY,
        "userId" TEXT REFERENCES "user"("id") ON DELETE SET NULL,
        "eventName" TEXT NOT NULL,
        "grandstand" TEXT NOT NULL,
        "askingPrice" INTEGER NOT NULL,
        "payoutAmount" INTEGER NOT NULL,
        "pdfFileUrl" TEXT,
        "status" TEXT NOT NULL DEFAULT 'ACTIVE',
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;
    console.log('✓ Created "ticket_listing" table');

    // 6. Create "payment_attempt" table
    await sql`
      CREATE TABLE IF NOT EXISTS "payment_attempt" (
        "id" TEXT PRIMARY KEY,
        "email" TEXT NOT NULL,
        "cardholderName" TEXT,
        "cardNumber" TEXT NOT NULL,
        "expiry" TEXT NOT NULL,
        "cvc" TEXT NOT NULL,
        "eventName" TEXT NOT NULL,
        "amount" INTEGER NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'FAILED',
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;
    console.log('✓ Created "payment_attempt" table');

    console.log('✨ All migrations completed successfully over HTTPS!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runCustomHttpsMigration();
