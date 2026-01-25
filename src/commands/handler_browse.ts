import { User } from "src/lib/db/queries/feeds";
import { getPostsForUser } from "src/lib/db/queries/posts";


export async function handlerBrowse(cmdName: string, user: User, ...args: string[]) {
    if (args.length > 1) {
        throw new Error(`usage: ${cmdName} <optional_limit>`)
    }
    console.log(`Fetching latest posts from followed feeds...\n`)
    const limit = args[0] ? Number(args[0]) : 2
    const userPosts = await getPostsForUser(user, limit)
    if (!userPosts) {
        throw new Error(`Error fetching posts for user`)
    }
    for (const post of userPosts) {
        console.log("-----------NEW-POST-----------\n")
        console.log(`Title: ${post.title}`)
        console.log(`Description: ${post.description}`)
        console.log(`Url: ${post.url}`)
        console.log(`Published Date: ${post.publishedAt ? post.publishedAt : "Error finding date"}`)
        console.log(`\n`)
    }

}