"use server"

import { StreamChat } from "stream-chat"

export async function generateToken(userId: string) {
  const api_key = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY
  const api_secret = process.env.NEXT_PUBLIC_GET_STREAM_SECRET

  // Initialize server client
  const serverClient = StreamChat.getInstance(api_key, api_secret)
  // Create user token
  const token = serverClient.createToken(userId)
  return token
}
