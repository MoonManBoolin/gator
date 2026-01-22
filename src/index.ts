import { setUser, readConfig } from "./config";
import { CommandsRegistry, CommandHandler, registerCommand, runCommand, handlerLogin } from "./commands_registry";
import { argv } from 'node:process';

function main() {
  const registry: CommandsRegistry = {}
  registerCommand(registry, "login", handlerLogin)
  const cmds = argv.slice(2)
  if (!cmds.length) {
    console.error('Not enough arguments')
    process.exit(1)
  }
  const cmdName = cmds[0]
  const args = cmds.slice(1)
  console.log(`Command: ${cmdName}\nArgs: ${args}`)
  runCommand(registry, cmdName, ...args)
}

main();
