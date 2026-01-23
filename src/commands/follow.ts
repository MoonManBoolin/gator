import { createFeedFollow } from "src/lib/db/queries/feed-follows";
import { feedLookUpByUrl } from "src/lib/db/queries/feeds";
import { getCurrentUser } from "src/lib/db/queries/users";


export async function follow(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`Url not found: ${args[0]}`)
    }
    const feed = await feedLookUpByUrl(args[0])
    if (!feed) {
        throw new Error(`Feed not found: ${args[0]}`)
    }
    const user = await getCurrentUser()
    const feedFollow = await createFeedFollow(user.id, feed.id)
    console.log(`Feed name: ${feedFollow.feedName}`)
    console.log(`Current user: ${user.name}`)
}