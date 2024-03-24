"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"

export function Header() {
    const session = useSession()

    return (
        <header>
            <Button onClick={handleAuthentication}>
                {session.data ? "Sign Out" : "Sign In"}
            </Button>
            {session.data?.user?.name}
            <ModeToggle />
        </header>
    )

    function handleAuthentication() {
        if (session.data) {
            signOut()
        } else {
            signIn("google")
        }
    }
}
