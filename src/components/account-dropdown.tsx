import { deleteAccountAction } from "@/app/actions"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteIcon, LogOutIcon } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useState } from "react"
import ConfirmationDialog from "./confirmation-dialog"

export default function AccountDropdown() {
  const session = useSession()
  const [open, setOpen] = useState(false)

  return (
    <>
      <ConfirmationDialog
        open={open}
        onOpenChange={setOpen}
        title={"Are you absolutely sure?"}
        description={
          "This action cannot be undone. This will permanently delete all your account data."
        }
        onConfirm={deleteAccount}
      />

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
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={openModal}>
            <DeleteIcon className={"mr-2"} />
            {"Delete Account"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )

  function openModal() {
    setOpen(true)
  }

  async function deleteAccount() {
    await deleteAccountAction()
    signOut({
      callbackUrl: "/",
    })
  }

  function handleAuthentication() {
    signOut({
      callbackUrl: "/",
    })
  }
}
