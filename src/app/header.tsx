"use client"

import AccountDropdown from "@/components/account-dropdown"
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  return (
    <header className={"bg-gray-100 dark:bg-gray-900 py-2 px-4 mx-auto"}>
      <div className={"flex justify-between items-center"}>
        <Link href={"/"} className={"flex items-center gap-2 text-xl hover:underline"}>
          <Image src={"/icon.png"} alt={""} height={"60"} width={"60"} />
          {"Dev Finder"}
        </Link>

        <div className={"flex items-center gap-4"}>
          <AccountDropdown />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
