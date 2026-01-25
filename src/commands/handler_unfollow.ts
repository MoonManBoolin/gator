import { deleteFeedFollow } from "src/lib/db/queries/feed-follows";
import { User } from "src/lib/db/queries/feeds";

export async function handerUnfollow(_cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`Url not found: ${args[0]}`)
    }
    console.log(`Unfollowing: ${args[0]}`)
    await deleteFeedFollow(args[0], user.id)
    console.log(`Successfully unfollowed!`)
}