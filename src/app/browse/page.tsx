import EmptyState from "@/components/empty-state"
import RoomCard from "@/components/room-card"
import SearchBar from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { getRooms } from "@/data-access/rooms"
import { getSession } from "@/lib/auth"
import { unstable_noStore } from "next/cache"
import Link from "next/link"

interface Props {
  searchParams: {
    search?: string
  }
}

export default async function Home({ searchParams }: Props) {
  // mark function as dynamic
  unstable_noStore()

  const session = await getSession()
  const { search = "" } = searchParams
  const rooms = await getRooms(search)

  return (
    <main className={"min-h-screen p-16"}>
      <div className={"flex justify-between items-center mb-8"}>
        <h1 className={"text-4xl"}>{"Find Dev Rooms"}</h1>
        {session?.user && (
          <Button asChild>
            <Link href={"/create-room"}>{"Create Room"}</Link>
          </Button>
        )}
      </div>

      <div className={"mb-8"}>
        <SearchBar rootUrl={"/browse"} />
      </div>

      <div className={"grid grid-cols-3 gap-4"}>
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>

      {rooms.length === 0 && (
        <EmptyState
          title={"No rooms found..."}
          button={
            <Button asChild>
              <Link href={"/create-room"}>{"Create Room"}</Link>
            </Button>
          }
        />
      )}
    </main>
  )
}
