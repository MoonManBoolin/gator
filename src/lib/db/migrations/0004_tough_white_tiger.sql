CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp,
	"title" text,
	"url" text NOT NULL,
	"description" text,
	"feed_id" uuid NOT NULL,
	CONSTRAINT "posts_url_unique" UNIQUE("url")
);
--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "feedFk" FOREIGN KEY ("feed_id") REFERENCES "public"."feeds"("id") ON DELETE cascade ON UPDATE no action;