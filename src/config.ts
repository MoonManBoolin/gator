import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
    dbUrl: string;
    currentUserName: string;
}

export function setUser(user: string): void {
    const cfg = readConfig()
    cfg.currentUserName = user
    writeConfig(cfg)
}

export function readConfig(): Config {
    const rawConfig = JSON.parse(fs.readFileSync(getConfigFilePath(), "utf-8"))
    const config = validateConfig(rawConfig)
    return config
}

function getConfigFilePath(): string {
    return path.join(os.homedir(), ".gatorconfig.json")
}

function writeConfig(cfg: Config): void {
    const rawConfig = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName
    }
    fs.writeFileSync(getConfigFilePath(), JSON.stringify(rawConfig, null, 2), { encoding: "utf-8" })
}

function validateConfig(rawConfig: any): Config {
    if (typeof rawConfig !== 'object' || rawConfig === null) {
        throw new Error(`Config is not a valid object`)
    }
    if (typeof rawConfig.db_url !== "string") {
        throw new Error(`dbUrl is missing or not a string`)
    }
    const cfg = {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name || ""
    }
    return cfg

}