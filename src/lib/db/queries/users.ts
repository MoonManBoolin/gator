import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUserByName(name: string) {
    const [result] = await db.select().from(users).where(eq(users.name, name))
    return result
}

export async function getAllUsers() {
    const result = await db.select().from(users)
    return result
}

export async function resetUsersTable() {
    try {
        await db.delete(users)
        process.exit(0)
    } catch (err) {
        console.error((err as Error).message)
        process.exit(1)
    }
    
}