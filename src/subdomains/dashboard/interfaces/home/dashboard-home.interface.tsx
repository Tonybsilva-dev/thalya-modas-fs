'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cardDataList } from "@/shared/mock/card-data-list.mock";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";

export const DashboardHomeInterface = () => {
  const { data: session } = useSession();

  if (!session) {
    return notFound()
    // Include 'type' if you store it in the session
  }

  return (<>
    <h1>Welcome, {session?.user.name}</h1>
    {/* <div className="container grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cardDataList.map((cardData, index) => {
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{cardData.title}</CardTitle>
              {cardData.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cardData.value}</div>
              <p className="text-xs text-muted-foreground">{cardData.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div> */}
  </>
  )

}