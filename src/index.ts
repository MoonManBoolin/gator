import { setUser, readConfig } from "./config";

function main() {
  setUser("moonman")
  const result = readConfig()
  console.log(result)
}

main();
