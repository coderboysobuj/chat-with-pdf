"use client"

import { trpc } from "../_trpc/client"

export default function AuthCallback() {
  const { data } = trpc.hello.useQuery()
  console.log(data)
  return (
    <h1>Callback</h1>
  )
}
