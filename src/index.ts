import { CommandsRegistry, registerCommand, runCommand } from "./commands/commands_registry.js";
import { argv } from 'node:process';
import { handlerLogin } from "./commands/handler_login.js"
import { register } from "./commands/register_user.js";

async function main() {
  const registry: CommandsRegistry = {}
  registerCommand(registry, "login", handlerLogin)
  registerCommand(registry, "register", register)
  const cmds = argv.slice(2)
  if (!cmds.length) {
    console.error('Not enough arguments')
    process.exit(1)
  }
  const cmdName = cmds[0]
  const args = cmds.slice(1)
  try {
    await runCommand(registry, cmdName, ...args)
    process.exit(0);
  } catch (err) {
    console.error((err as Error).message)
    process.exit(1);
  }
  
}

main();
