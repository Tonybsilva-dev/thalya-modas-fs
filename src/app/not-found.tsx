'use client'

import { Button } from "@/components/ui/button"
import { TriangleAlertIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"


export default function Custom404() {
  const router = useRouter()

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <TriangleAlertIcon className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Página não encontrada</h1>
        <p className="mt-4 text-muted-foreground">
          A página que você solicitou não foi localizada. Verifique o URL ou navegue de volta para a página principal.
        </p>
        <div className="mt-6">

          <Button onClick={() => router.back()} size={"sm"}>
            Navegar de volta
          </Button>
        </div>
      </div>
    </div>
  )
}