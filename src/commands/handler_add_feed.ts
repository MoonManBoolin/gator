import { createFeedFollow } from "src/lib/db/queries/feed-follows"
import { createFeed, printFeed, User } from "src/lib/db/queries/feeds"

export async function handlerAddFeed(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <feed_name> <url>`)
    }
    try {
        const [feedName, url] = args
        const feed = await createFeed(feedName, url, user.id)
        const feedFollow = await createFeedFollow(user.id, feed.id)
        console.log(feedFollow.feedName)
        console.log(feedFollow.userName)
        printFeed(feed, user)
    } catch (err) {
        console.error((err as Error).message)
        process.exit(1)
    }
    

}