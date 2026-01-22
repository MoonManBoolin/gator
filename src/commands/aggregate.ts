import { fetchFeed } from "src/lib/rss"

export async function agg(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length) {
        throw new Error(`usage: ${cmdName}`)
    }
    try {
        const feed = await fetchFeed("https://www.wagslane.dev/index.xml")
        console.log(JSON.stringify(feed))
    } catch (err) {
        console.error((err as Error).message)
        process.exit(1)
    }
}