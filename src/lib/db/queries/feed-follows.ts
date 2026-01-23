import { db } from "..";
import { feeds, users, feedFollows } from "../schema";
import { eq } from "drizzle-orm";

export async function createFeedFollow(user_id: string, feed_id: string) {
    const [newFeedFollow] = await db.insert(feedFollows).values({ userId: user_id, feedId: feed_id }).returning();
    const [feedFollow] = await db.select({
        id: feedFollows.id,
        createdAt: feedFollows.createdAt,
        updatedAt: feedFollows.updatedAt,
        feedName: feeds.name,
        userName: users.name,
        userId: feedFollows.userId,
        feedId: feedFollows.feedId

    }).from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .where(eq(feedFollows.id, newFeedFollow.id))
    return feedFollow
}

export async function getFeedFollowsForUser(userId: string) {
    const userFeedFollows = await db.select({
        id: feedFollows.id,
        createdAt: feedFollows.createdAt,
        updatedAt: feedFollows.updatedAt,
        feedName: feeds.name,
        userName: users.name,
        userId: feedFollows.userId,
        feedId: feedFollows.feedId

    }).from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .where(eq(feedFollows.userId, userId))
    return userFeedFollows
}