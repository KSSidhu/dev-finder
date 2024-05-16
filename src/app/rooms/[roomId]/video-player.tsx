"use client"

import "@stream-io/video-react-sdk/dist/css/styles.css"
import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { generateToken } from "./actions"
import { useRouter } from "next/navigation"

interface Props {
  roomId: string
}

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!

export default function DevFinderVideo({ roomId }: Props) {
  const session = useSession()
  const [client, setClient] = useState<StreamVideoClient>()
  const [call, setCall] = useState<Call>()
  const router = useRouter()

  useEffect(() => {
    if (!session.data) return

    const userId = session.data.user.id
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
        name: session.data.user.name || "User",
        image: session.data.user.image || "",
      },
      tokenProvider: () => generateToken(userId),
    })
    const call = client.call("default", roomId)
    call.join({ create: true })
    setClient(client)
    setCall(call)

    return () => {
      // Camera doesn't seem to always disable when leaving call
      call.camera.disable()
      call
        .leave()
        .then(() => {
          client.disconnectUser()
        })
        .catch((e) => console.log(e))
      setCall(undefined)
      setClient(undefined)
    }
  }, [session])

  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamTheme>
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls
              onLeave={() => {
                router.push("/browse")
              }}
            />
            <CallParticipantsList onClose={() => undefined} />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    )
  )
}
