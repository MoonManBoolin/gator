import { setUser } from "src/config"
import { createUser, getUserByName } from "src/lib/db/queries/users"

export async function register(cmdName: string, ...args: string[]): Promise<void> {
    if (!args.length) {
        throw new Error(`usage: ${cmdName} <name>`)
    }
    const userExists = await getUserByName(args[0])
    if (userExists) {
        throw new Error(`The user with name: ${args[0]}, has already been created.\nUser data: ${userExists}`)
    }
    const user = await createUser(args[0])
    setUser(user.name)
    console.log(`User created: ${user.name}\nUser data: ${JSON.stringify(user)}`)


    
}