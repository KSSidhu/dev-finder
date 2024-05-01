"use client"

import "@stream-io/video-react-sdk/dist/css/styles.css"
import {
  Call,
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { generateToken } from "./actions"

interface Props {
  roomId: string
}

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!

export default function DevFinderVideo({ roomId }: Props) {
  const session = useSession()
  const [client, setClient] = useState<StreamVideoClient>()
  const [call, setCall] = useState<Call>()

  useEffect(() => {
    if (!session.data) return

    const userId = session.data.user.id
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
      },
      tokenProvider: () => generateToken(userId),
    })
    const call = client.call("default", roomId)
    call.join({ create: true })
    setClient(client)
    setCall(call)

    return () => {
      call.leave()
      client.disconnectUser()
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
            <CallControls />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    )
  )
}
