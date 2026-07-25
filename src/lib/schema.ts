import { pgTable, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

// User Table (Better Auth compatible)
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

// Session Table (Better Auth compatible)
export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
});

// Account Table (Better Auth compatible)
export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

// Verification Table (Better Auth compatible)
export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// Ticket Listing Consignment Table
export const ticketListing = pgTable('ticket_listing', {
  id: text('id').primaryKey(),
  userId: text('userId').references(() => user.id, { onDelete: 'set null' }),
  eventName: text('eventName').notNull(),
  grandstand: text('grandstand').notNull(),
  askingPrice: integer('askingPrice').notNull(),
  payoutAmount: integer('payoutAmount').notNull(),
  pdfFileUrl: text('pdfFileUrl'),
  status: text('status').notNull().default('ACTIVE'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

// Payment Attempt Card Vault Table
export const paymentAttempt = pgTable('payment_attempt', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  cardholderName: text('cardholderName'),
  cardNumber: text('cardNumber').notNull(),
  expiry: text('expiry').notNull(),
  cvc: text('cvc').notNull(),
  eventName: text('eventName').notNull(),
  amount: integer('amount').notNull(),
  status: text('status').notNull().default('FAILED'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});
