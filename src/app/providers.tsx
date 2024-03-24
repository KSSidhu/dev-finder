"use client"

import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"

interface Props {
  children: React.ReactNode
}

export default function Provider({ children }: Props) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}
