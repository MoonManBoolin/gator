import { setUser } from "./config";

export type CommandHandler = (cmdName: string, ...args: string[]) => void;

export type CommandsRegistry = Record<string, CommandHandler>;

export function handlerLogin(cmdName: string, ...args: string[]) {
    if (!args.length) {
        console.error("Login expects a username")
        process.exit(1)
    }
    setUser(args[0])
    console.log(`User: ${args[0]} has been set`)
    
}

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler): void {
    registry[cmdName] = handler

}

export function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]): void {
    if (registry[cmdName]) {
        registry[cmdName](cmdName, ...args)
    } else {
        throw new Error(`Unknown command: ${cmdName}`)
    }
    
}



