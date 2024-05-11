import { getRoom } from "@/data-access/rooms"
import EditRoomForm from "./edit-room-form"
import { unstable_noStore } from "next/cache"

interface Props {
  params: {
    roomId: string
  }
}

export default async function EditRoomPage({ params }: Props) {
  unstable_noStore()

  const { roomId } = params

  const room = await getRoom(roomId)

  if (!room) {
    return <h1 className={"text-4xl font-bold"}>{"Room not found..."}</h1>
  }

  return (
    <div className={"container mx-auto flex flex-col gap-8 pt-12 pb-24"}>
      <h1 className={"text-4xl font-bold"}>{"Edit Room"}</h1>

      <EditRoomForm room={room} />
    </div>
  )
}
