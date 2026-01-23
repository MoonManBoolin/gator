import { getFeedFollowsForUser } from "src/lib/db/queries/feed-follows";
import { getCurrentUser } from "src/lib/db/queries/users";

export async function following() {
    const currentUser = await getCurrentUser()
    const feeds = await getFeedFollowsForUser(currentUser.id)
    for (const feed of feeds) {
        console.log(feed.feedName)
    }
}