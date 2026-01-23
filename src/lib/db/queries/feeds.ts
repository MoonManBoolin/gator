import { db } from "../";
import { feeds, users } from "../schema";


export async function createFeed(feedName: string, feedUrl: string, userId: string) {
    const [result] = await db.insert(feeds).values({ name: feedName, url: feedUrl, userId }).returning()
    return result
}

export async function printFeed(feed: Feed, user: User) {
    console.log("Feed ID:", feed.id);
    console.log("Feed Name:", feed.name);
    console.log("Feed URL:", feed.url);
    console.log("Feed User ID:", feed.userId);
    console.log("User ID:", user.id);
    console.log("User Name:", user.name);
}

export type Feed = typeof feeds.$inferSelect;
export type User = typeof users.$inferSelect;