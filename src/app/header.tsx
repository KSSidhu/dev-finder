"use client"

import AccountDropdown from "@/components/account-dropdown"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { LogInIcon } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  const session = useSession()

  return (
    <header className={"bg-gray-100 dark:bg-gray-900 py-2 px-4 mx-auto z-10 relative"}>
      <div className={"flex justify-between items-center"}>
        <Link href={"/"} className={"flex items-center gap-2 text-xl hover:underline"}>
          <Image src={"/icon.png"} alt={""} height={"60"} width={"60"} />
          {"Dev Finder"}
        </Link>

        {session.data && (
          <nav className={"flex gap-8"}>
            <Link href={"/browse"} className={"hover:underline"}>
              {"Browse"}
            </Link>
            <Link href={"/your-rooms"} className={"hover:underline"}>
              {"Your Rooms"}
            </Link>
          </nav>
        )}
        <div className={"flex items-center gap-4"}>
          {session.data && <AccountDropdown />}
          {!session.data && (
            <Button onClick={() => signIn()}>
              <LogInIcon />
              {"Sign In"}
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
