import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Providers from "./providers"
import NextTopLoader from "nextjs-toploader"
import { Header } from "./header"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dev Finder",
  description: "A web app to help devs find pair programming partners online",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <NextTopLoader />
          <Header />
          <div className={"container mx-auto"}>{children}</div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
