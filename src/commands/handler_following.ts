import { getFeedFollowsForUser } from "src/lib/db/queries/feed-follows";
import { User } from "src/lib/db/queries/feeds";

export async function handlerFollowing(_cmdName: string, user: User, ..._args: string[]) {
    const feeds = await getFeedFollowsForUser(user.id)
    for (const feed of feeds) {
        console.log(feed.feedName)
    }
}