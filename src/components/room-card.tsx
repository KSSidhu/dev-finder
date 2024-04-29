import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Room } from "@/db/schema"
import { GithubIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

interface Props {
  room: Room
}

export default function RoomCard({ room }: Props) {
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
      <CardContent>
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
