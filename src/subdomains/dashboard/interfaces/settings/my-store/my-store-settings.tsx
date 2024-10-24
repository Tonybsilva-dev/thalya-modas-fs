import dynamic from 'next/dynamic';
import { getStoreInfo } from "./actions/get-store-info.action"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { notFound } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';

const StoreSettings = dynamic(() => import('./components/storeSettings.component'), { ssr: false, suspense: true });

export const MyStoreSettingsInterface = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound()
  }

  const USER_ID = session.user.id
  const STORES = await getStoreInfo({ ownerId: USER_ID })

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

      <div className="flex-col min-h-screen bg-background text-foreground">
        <Suspense fallback={<Spinner />}>
          <StoreSettings initialData={STORES} />
        </Suspense>
      </div >
    </>
  )
}
