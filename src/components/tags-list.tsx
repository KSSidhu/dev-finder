"use client"

import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { badgeVariants } from "./ui/badge"

interface Props {
  tags: string[]
}

export default function TagsList({ tags }: Props) {
  const router = useRouter()

  return (
    <div className={"flex gap-2 flex-wrap"}>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => applyFilter(tag)}
          className={cn(badgeVariants())}
        >
          {tag}
        </button>
      ))}
    </div>
  )

  function applyFilter(tag: string) {
    router.push(`/?search=${tag}`)
  }
}
