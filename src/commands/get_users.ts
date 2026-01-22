import { readConfig } from "src/config"
import { getAllUsers } from "src/lib/db/queries/users"

export async function getUsers(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length) {
        throw new Error(`usage: ${cmdName}`)
    }
    try {
        const users = await getAllUsers()
        const currentConfig = readConfig()
        for (const user of users.reverse()) {
            console.log(`* ${user.name} ${currentConfig.currentUserName === user.name ? "(current)" : ""}`)
        }
    } catch (err) {
        console.error((err as Error).message)
        process.exit(1)
    }
    

}