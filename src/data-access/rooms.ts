import { db } from "@/db"
import { room } from "@/db/schema"
import { eq, like } from "drizzle-orm"
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

export async function getRoom(roomId: string) {
  unstable_noStore()

  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  })
}
