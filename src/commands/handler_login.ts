import { setUser } from "../config";
import { getUserByName } from "src/lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
    if (!args.length) {
        throw new Error(`usage: ${cmdName} <name>`)
    }
    const userExists = await getUserByName(args[0])
    if (!userExists) {
        throw new Error(`The user with name: ${args[0]}, doesn't exist!`)
    }
    setUser(args[0])
    console.log(`User: ${args[0]} has been set`)
    
}