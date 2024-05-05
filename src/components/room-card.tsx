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
import { GithubIcon } from "lucide-react"
import Link from "next/link"
import TagsList from "./tags-list"
import { Button } from "./ui/button"

interface Props {
  room: Room
}

export default function RoomCard({ room }: Props) {
  const tags = splitTags(room.tags)

  return (
    <Card>
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
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>{"Join Room"}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
