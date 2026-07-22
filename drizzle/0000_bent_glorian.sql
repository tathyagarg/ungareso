CREATE TABLE "reso" (
	"undl_id" integer PRIMARY KEY NOT NULL,
	"session" smallint NOT NULL,
	"symbol" text NOT NULL,
	"drafts" text NOT NULL,
	"title" text NOT NULL,
	"agenda" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "votes" (
	"undl_id" integer PRIMARY KEY NOT NULL,
	"session" smallint NOT NULL,
	"member_code" char(3) NOT NULL,
	"vote" char NOT NULL
);
