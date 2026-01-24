import { User } from "src/lib/db/queries/feeds";
import { CommandHandler } from "./commands/commands_registry";
import { getCurrentUser } from "./lib/db/queries/users";

export type UserCommandHandler = (
    cmdName: string,
    user: User,
    ...args: string[]
) => Promise<void>;

export type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
    return async (cmdName: string, ...args: string[]) => {
        const currentUser = await getCurrentUser();
        return handler(cmdName, currentUser, ...args)
    }
}