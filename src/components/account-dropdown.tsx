import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogInIcon, LogOutIcon } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"

export default function AccountDropdown() {
  const session = useSession()
  const isLoggedIn = !!session.data

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
          {isLoggedIn ? (
            <LogInIcon className={"mr-2"} />
          ) : (
            <LogOutIcon className={"mr-2"} />
          )}
          {isLoggedIn ? "Sign Out" : "Sign In"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  function handleAuthentication() {
    if (session.data) {
      signOut()
    } else {
      signIn("google")
    }
  }
}
