"use server"

import { db } from "@/db"
import { Room, room } from "@/db/schema"

export async function createRoomAction(roomData: Omit<Room, "userId">) {
  await db
    .insert(room)
    .values({ ...roomData, userId: "TODO" })
    .execute()
}
