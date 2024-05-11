import { db } from "@/db"
import { Room, room } from "@/db/schema"
import { getSession } from "@/lib/auth"
import { and, eq, like } from "drizzle-orm"

export async function getRooms(search?: string) {
  let where = undefined

  if (search) where = like(room.tags, `%${search}%`)

  const rooms = await db.query.room.findMany({
    where,
  })
  return rooms
}

export async function getUserRooms(search?: string, userId?: string) {
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
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  })
}

export async function createRoom(roomData: Omit<Room, "id" | "userId">, userId: string) {
  const inserted = await db
    .insert(room)
    .values({ ...roomData, userId })
    .returning()

  return inserted[0]
}

export async function editRoom(roomData: Room) {
  if (!roomData.id) throw new Error("Cannot find room.")

  const updated = await db
    .update(room)
    .set(roomData)
    .where(eq(room.id, roomData.id))
    .returning()
  return updated[0]
}

export async function deleteRoom(roomId: string) {
  return await db.delete(room).where(eq(room.id, roomId))
}
