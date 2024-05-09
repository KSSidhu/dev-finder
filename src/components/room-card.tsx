"use client"

import { deleteRoomAction } from "@/app/your-rooms/actions"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Room } from "@/db/schema"
import { splitTags } from "@/lib/utils"
import { GithubIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import ConfirmationDialog from "./confirmation-dialog"
import TagsList from "./tags-list"
import { Button } from "./ui/button"

interface Props {
  room: Room
  canDelete?: boolean
}

export default function RoomCard({ room, canDelete = false }: Props) {
  const tags = splitTags(room.tags)

  return (
    <Card className={"flex flex-col justify-between"}>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>
          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className={"flex items-center gap-2"}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              <GithubIcon />
              {room.githubRepo}
            </Link>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className={"flex flex-col gap-4"}>
        <TagsList tags={tags} />
        <p>{room.description}</p>
      </CardContent>
      <CardFooter className={"flex justify-between"}>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>{"Join Room"}</Link>
        </Button>

        {canDelete && (
          <ConfirmationDialog
            title={"Are you sure you want to delete this room?"}
            description={
              "This action cannot be undone. This will permanently remove the room and any data associated with it."
            }
            onConfirm={deleteRoom}
            triggerButton={
              <Button variant={"destructive"}>
                <TrashIcon className={"w-4 h-4"} />
              </Button>
            }
          />
        )}
      </CardFooter>
    </Card>
  )

  async function deleteRoom() {
    if (room.id) await deleteRoomAction(room.id)
  }
}
