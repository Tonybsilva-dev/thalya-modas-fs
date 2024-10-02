'use client'

import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";

export const DashboardHomeInterface = () => {
  const { data: session } = useSession();

  if (!session) {
    return notFound()
    // Include 'type' if you store it in the session
  }

  return <h1>Welcome, {session?.user.name}</h1>

}