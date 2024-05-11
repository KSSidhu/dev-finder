import Image from "next/image"

interface Props {
  title: string
  button?: React.ReactNode
}

export default function EmptyState({ title, button }: Props) {
  return (
    <div className={"flex flex-col gap-6 justify-center items-center mt-24"}>
      <Image src={"./no-data.svg"} height={200} width={200} alt={"No data found..."} />
      <h2 className={"text-2xl"}>{title}</h2>
      {button}
    </div>
  )
}
