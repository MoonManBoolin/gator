import { getNextFeedToFetch, markFeedFetched } from "../lib/db/queries/feeds"
import { fetchFeed } from "../lib/rss"

export async function agg(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <time_between_requests>`)
    }
    try {
        const timeBetweenRequest = parseDuration(args[0])

        console.log(`Collecting feeds every ${args[0]}`)
        scrapeFeeds().catch(handleError)
        const interval = setInterval(() => {
            scrapeFeeds().catch(handleError)
        }, timeBetweenRequest)
        await new Promise<void>((resolve) => {
            process.on("SIGINT", () => {
                console.log("Shutting down feed aggregator...");
                clearInterval(interval);
                resolve();
            })
        })
    } catch (err) {
        console.error((err as Error).message)
        process.exit(1)
    }
}

export async function scrapeFeeds() {
    const nextFeed = await getNextFeedToFetch()
    await markFeedFetched(nextFeed.id)
    const fetchedFeeds = await fetchFeed(nextFeed.url)
    console.log(`\nFetching feeds from ${fetchedFeeds.title}\n`)
    for (const feedItem of fetchedFeeds.item) {
        console.log(feedItem.title)
    }
}

export function parseDuration(durationStr: string): number {
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex)
    if (!match) {
        throw new Error(`Couldn't parse ${durationStr} into correct time, example usage: 1ms | 1s | 1m | 1h`)
    }
    const value = Number(match[1])
    const unit = match[2]
    
    if (unit === "s") {
        return value * 1000
    } else if (unit === "m") {
        return value * 60000
    } else if (unit === "h") {
        return value * 3600000
    } else {
        return value
    }
}

function handleError(err: unknown) {
    console.error((err as Error).message)
}