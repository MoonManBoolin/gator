import { readConfig } from "src/config"
import { createFeed, printFeed } from "src/lib/db/queries/feeds"
import { getUserByName } from "src/lib/db/queries/users"

export async function addFeed(cmdName: string, ...args: string[]) {
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <feed_name> <url>`)
    }
    try {
        const [feedName, url] = args
        const currentUser = await getUserByName(readConfig().currentUserName)
        const feed = await createFeed(feedName, url, currentUser.id)
        printFeed(feed, currentUser)
    } catch (err) {
        console.error((err as Error).message)
        process.exit(1)
    }
    

}