import { db } from "@/db"
import { unstable_noStore } from "next/cache"

export async function getRooms() {
  // mark function as dynamic
  unstable_noStore()

  const rooms = await db.query.room.findMany()
  return rooms
}
