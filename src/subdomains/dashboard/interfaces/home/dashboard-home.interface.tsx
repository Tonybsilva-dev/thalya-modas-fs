'use client'

import { useSession } from "next-auth/react";

export const DashboardHomeInterface = () => {
  const { data: session } = useSession();

  if (session) {
    console.log('User ID:', session.user.id);
    console.log('User Role:', session.user.role);
    // Include 'type' if you store it in the session
  }

  return <h1>Welcome, {session?.user.name}</h1>

}