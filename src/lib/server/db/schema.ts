import { relations } from 'drizzle-orm';
import { foreignKey } from 'drizzle-orm/gel-core';
import { pgTable, integer, text, smallint, char, boolean, primaryKey } from 'drizzle-orm/pg-core';

export const reso = pgTable('reso', {
  undl_id: integer('undl_id').primaryKey(),
  session: smallint('session').notNull(),
  voted: boolean('voted').notNull().default(true),
  special: boolean('special').notNull().default(false),
  emergency: boolean('emergency').notNull().default(false),
  symbol: text('symbol').notNull(),
  drafts: text('drafts').notNull(),
  title: text('title').notNull(),
  agenda: text('agenda').notNull(),
  date: text('date'),
});

export const votes = pgTable('votes', {
  undl_id: integer('undl_id').references(() => reso.undl_id, { onDelete: 'cascade' }).notNull(),
  session: smallint('session').notNull(),
  member_code: char('member_code', { length: 3 }).notNull(),
  vote: char('vote', { enum: ["Y", "X", "A", "N"] }).notNull(),
}, (table) => [
  primaryKey({ columns: [table.undl_id, table.session, table.member_code] }),
]);

export const resoVotesRelation = relations(reso, ({ many }) => ({
  votes: many(votes)
}));

export const votesResoRelation = relations(votes, ({ one }) => ({
  reso: one(reso, {
    fields: [votes.undl_id],
    references: [reso.undl_id],
  })
}));
