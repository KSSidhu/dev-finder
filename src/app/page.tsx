import RoomCard from "@/components/room-card"
import { Button } from "@/components/ui/button"
import { getRooms } from "@/data-access/rooms"
import Link from "next/link"

export default async function Home() {
  const rooms = await getRooms()

  return (
    <main className={"min-h-screen p-16"}>
      <div className={"flex justify-between items-center mb-8"}>
        <h1 className={"text-4xl"}>{"Find Dev Rooms"}</h1>
        <Button asChild>
          <Link href={"/create-room"}>{"Create Room"}</Link>
        </Button>
      </div>
      <div className={"grid grid-cols-3 gap-4"}>
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  )
}
