import { CommandsRegistry, registerCommand, runCommand } from "./commands/commands_registry.js";
import { argv } from 'node:process';
import { handlerLogin } from "./commands/handler_login.js"
import { register } from "./commands/register_user.js";
import { resetUsersTable } from "./lib/db/queries/users.js";
import { getUsers } from "./commands/get_users.js";
import { agg } from "./commands/aggregate.js";
import { handlerAddFeed } from "./commands/handler_add_feed.js";
import { printAllFeeds } from "./lib/db/queries/feeds.js";
import { handlerFollow } from "./commands/handler_follow.js";
import { handlerFollowing } from "./commands/handler_following.js";
import { middlewareLoggedIn } from "./middleware.js";
import { handerUnfollow } from "./commands/handler_unfollow.js";

async function main() {
  const registry: CommandsRegistry = {}
  registerCommand(registry, "login", handlerLogin)
  registerCommand(registry, "register", register)
  registerCommand(registry, "reset", resetUsersTable)
  registerCommand(registry, "users", getUsers)
  registerCommand(registry, "agg", agg)
  registerCommand(registry, "feeds", printAllFeeds)
  registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed))
  registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow))
  registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing))
  registerCommand(registry, "unfollow", middlewareLoggedIn(handerUnfollow))
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
