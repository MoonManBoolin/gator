import { db } from "..";
import { feedFollows, posts } from "../schema"
import { eq, desc } from "drizzle-orm"
import { User } from "./feeds";

export async function createPost(feedId: string, url: string, publishedAt?: Date, title?: string, description?: string): Promise<Post> {
    const postExists = await getPostByUrl(url)
    if (postExists) {
        console.log(`Post with url: ${url} already exists! Updating post instead.`)
        const [result] = await db.update(posts)
        .set({ publishedAt, title, description })
        .where(eq(posts.url, url))
        .returning()
        return result
    }
    console.log(`Creating post with url: ${url}`)   
    const [result] = await db.insert(posts).values({ feedId, url, publishedAt, title, description}).returning()
    return result
}

export async function getPostByUrl(url: string) {
    const [result] = await db.select().from(posts).where(eq(posts.url, url))
    return result
}

export async function getPostsForUser(user: User, limit: number) {
    const userPosts = await db.select({
        id: posts.id,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        publishedAt: posts.publishedAt,
        title: posts.title,
        url: posts.url,
        description: posts.description,
        feedId: posts.feedId
    })
    .from(posts)
    .innerJoin(feedFollows, eq(posts.feedId, feedFollows.feedId))
    .where(eq(feedFollows.userId, user.id))
    .orderBy(desc(posts.publishedAt), desc(posts.createdAt))
    .limit(limit)
    return userPosts
}

export type Post = typeof posts.$inferSelect