import { Badge } from "./ui/badge"

interface Props {
  tags: string[]
}

export default function TagsList({ tags }: Props) {
  return (
    <div className={"flex gap-2 flex-wrap"}>
      {tags.map((tag) => (
        <Badge key={tag} className={"w-fit"}>
          {tag}
        </Badge>
      ))}
    </div>
  )
}

export function splitTags(tags: string) {
  return tags.split(",").map((tag) => tag.trim())
}
