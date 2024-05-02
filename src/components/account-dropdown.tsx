import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOutIcon } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

export default function AccountDropdown() {
  const session = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={"flex gap-2"}>
        <Button variant={"link"}>
          <Avatar>
            <AvatarImage src={session.data?.user.image ?? ""} />
          </Avatar>
          {session.data?.user?.name || "Options"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleAuthentication}>
          <LogOutIcon className={"mr-2"} />
          {"Sign Out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  function handleAuthentication() {
    signOut({
      callbackUrl: "/",
    })
  }
}
