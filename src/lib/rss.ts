import { XMLParser } from "fast-xml-parser"

export async function fetchFeed(feedURL: string) {
    try {
        const response = await fetch(feedURL, {
            headers: {
                "User-Agent": "gator",
            }
        })
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const xmlText = await response.text();
        const parser = new XMLParser();
        let xmlObject = parser.parse(xmlText)
        let xmlChannel = xmlObject.rss.channel
        if (typeof xmlChannel !== "object" || !xmlChannel) {
            throw new Error(`The channel field does not exist on this rss feed`)
        }
        if (typeof xmlChannel.title !== "string" || !xmlChannel.title) {
            throw new Error(`Title field is missing in the channel object`)
        }
        if (typeof xmlChannel.link !== "string" || !xmlChannel.link) {
            throw new Error(`Link field missing in the channel object`)
        }
        if (typeof xmlChannel.description !== "string" || !xmlChannel.description) {
            throw new Error(`Description field missing in the channel object`)
        }
        const items = []
        if (typeof xmlChannel.item === "object" && !Array.isArray(xmlChannel.item)) {
            items.push(xmlChannel.item)
        } else if (Array.isArray(xmlChannel.item)) {
            for (const item of xmlChannel.item) {
                items.push(item)
            }
        } else {
            
        }
        for (const item of items) {
            if (typeof item.title !== "string" || !item.title) {
                continue
            }
            if (typeof item.link !== "string" || !item.link) {
                throw new Error(`Link of item field is missing or not a string`)
            }
            if (typeof item.description !== "string" || !item.description) {
                continue
            }
            if (typeof item.pubDate !== "string" || !item.pubDate) {
                throw new Error(`PubDate of item field is missing or not a string`)
            }
            if (typeof item.guid !== "string" || !item.guid) {
                continue
            }
        }

        const feedObj = {
            title: xmlChannel.title,
            link: xmlChannel.link,
            description: xmlChannel.description,
            item: items
        }

        return feedObj


    } catch (err) {
        console.error((err as Error).message)
        process.exit(1)
    }
}