import { db } from "../";
import { feeds, users } from "../schema";
import { getUserById } from "./users";
import { eq } from "drizzle-orm";

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

export async function printAllFeeds() {
    const feedList = await db.select().from(feeds)
    for (const feed of feedList) {
        const userName = await getUserById(feed.userId)
        console.log(feed.name)
        console.log(feed.url)
        console.log(userName.name)
    }
}

export async function feedLookUpByUrl(url: string) {
    const [feed] = await db.select().from(feeds).where(eq(feeds.url, url))
    if (!feed) {
        throw new Error(`Couldn't find feed with provided url: ${url}`)
    }
    return feed
}

export type Feed = typeof feeds.$inferSelect;
export type User = typeof users.$inferSelect;