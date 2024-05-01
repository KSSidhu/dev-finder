import TagsList, { splitTags } from "@/components/tags-list"
import { getRoom } from "@/data-access/rooms"
import { GithubIcon } from "lucide-react"
import Link from "next/link"
import DevFinderVideo from "./video-player"

interface Props {
  params: {
    roomId: string
  }
}

export default async function RoomPage({ params }: Props) {
  const { roomId } = params
  const room = await getRoom(roomId)

  if (!room) return <div>{"Cannot find room."}</div>

  const tags = splitTags(room.tags)

  return (
    <div className={"grid grid-cols-4 h-full min-h-screen"}>
      <div className={"col-span-3 p-4 pr-2"}>
        <div className={"rounded-lg border bg-card text-card-foreground shadow-sm p-12"}>
          <DevFinderVideo roomId={roomId} />
        </div>
      </div>
      <div className={"col-span-1 p-4 pl-2"}>
        <div
          className={
            "rounded-lg border bg-card text-card-foreground shadow-sm p-12 flex flex-col gap-4"
          }
        >
          <div className={"flex gap-2"}>
            <h1 className={"text-base"}>{room.name}</h1>
            {room.githubRepo && (
              <Link
                href={room.githubRepo}
                className={"flex items-center"}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                <GithubIcon />
              </Link>
            )}
          </div>
          <h2 className={"text-base text-gray-600"}>{room.description}</h2>

          <TagsList tags={tags} />
        </div>
      </div>
    </div>
  )
}
