import { db } from "@/db"
import { room } from "@/db/schema"
import { getSession } from "@/lib/auth"
import { and, eq, like } from "drizzle-orm"
import { unstable_noStore } from "next/cache"

export async function getRooms(search?: string) {
  // mark function as dynamic
  unstable_noStore()

  let where = undefined

  if (search) where = like(room.tags, `%${search}%`)

  const rooms = await db.query.room.findMany({
    where,
  })
  return rooms
}

export async function getUserRooms(search?: string, userId?: string) {
  // mark function as dynamic
  unstable_noStore()
  const session = await getSession()
  if (!session) {
    throw new Error("User not authenticated")
  }

  let where = undefined

  if (search) where = like(room.tags, `%${search}%`)

  if (userId) {
    if (where) {
      where = and(eq(room.userId, session.user.id), where)
    }
  }

  const rooms = await db.query.room.findMany({
    where,
  })
  return rooms
}

export async function getRoom(roomId: string) {
  unstable_noStore()

  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  })
}
