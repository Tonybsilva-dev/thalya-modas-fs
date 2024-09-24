import { Button } from "@/components/ui/button"
import { TitlePage } from "@/components/ui/title-page"
import { SaveIcon } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { getStoreInfo } from "./actions/get-store-info.action"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { notFound } from "next/navigation"
import StoreForm from "./components/storeForm.component"

export const MyStoreSettingsInterface = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound()
  }

  const userId = session?.user.id
  const stores = await getStoreInfo(userId)

  return (
    <>
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Início</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/settings">Configurações</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Minha loja</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <TitlePage title="Minha loja" >
          <Button className="flex gap-2">
            <SaveIcon className="h-5 w-5" />
            Salvar alterações
          </Button>
        </TitlePage>
        <main className="flex-1 py-8">
          <div className="container grid gap-8 px-4 md:px-6">
            <StoreForm initialData={stores} />
          </div>
        </main>
      </div >
    </>
  )
}