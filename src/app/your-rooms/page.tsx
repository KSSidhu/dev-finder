import EmptyState from "@/components/empty-state"
import RoomCard from "@/components/room-card"
import SearchBar from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { getUserRooms } from "@/data-access/rooms"
import { unstable_noStore } from "next/cache"
import Link from "next/link"

interface Props {
  searchParams: {
    search?: string
  }
}

export default async function YourRoomsPage({ searchParams }: Props) {
  // mark function as dynamic
  unstable_noStore()

  const { search = "" } = searchParams
  const rooms = await getUserRooms(search)

  return (
    <main className={"min-h-screen p-16"}>
      <div className={"flex justify-between items-center mb-8"}>
        <h1 className={"text-4xl"}>{"Your Rooms"}</h1>
        <Button asChild>
          <Link href={"/create-room"}>{"Create Room"}</Link>
        </Button>
      </div>

      <div className={"mb-8"}>
        <SearchBar rootUrl={"/your-rooms"} />
      </div>

      <div className={"grid grid-cols-3 gap-4"}>
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} canDelete canEdit />
        ))}
      </div>

      {rooms.length === 0 && (
        <EmptyState
          title={"You have no rooms...Try making one!"}
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
