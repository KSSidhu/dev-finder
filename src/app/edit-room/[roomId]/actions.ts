"use server"

import { editRoom, getRoom } from "@/data-access/rooms"
import { Room } from "@/db/schema"
import { getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/dist/client/components/navigation"

export async function editRoomAction(roomData: Omit<Room, "userId">) {
  const session = await getSession()
  if (!session) throw new Error("You must be logged in to create a room")

  const room = await getRoom(roomData?.id || "")
  if (session.user.id !== room?.userId) throw new Error("Not authorized to update")

  await editRoom({ ...roomData, userId: session.user.id })

  revalidatePath("/your-rooms")
  revalidatePath(`/edit-room/${roomData.id}`)
  redirect("/your-rooms")
}
