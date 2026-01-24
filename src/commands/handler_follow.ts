import { createFeedFollow } from "src/lib/db/queries/feed-follows";
import { feedLookUpByUrl } from "src/lib/db/queries/feeds";
import { User } from "src/lib/db/queries/feeds";

export async function handlerFollow(_cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`Url not found: ${args[0]}`)
    }
    const feed = await feedLookUpByUrl(args[0])
    if (!feed) {
        throw new Error(`Feed not found: ${args[0]}`)
    }
    const feedFollow = await createFeedFollow(user.id, feed.id)
    console.log(`Feed name: ${feedFollow.feedName}`)
    console.log(`Current user: ${user.name}`)
}