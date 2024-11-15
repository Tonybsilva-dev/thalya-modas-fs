import dynamic from "next/dynamic";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { getCustomers } from "./actions/get-customers";
const ListCustomers = dynamic(() => import('./components/list-customers.component'));

export const MyCustomersInterface = async () => {
  const session = await getServerSession(authOptions);

  const storeId = session?.user.storeId ?? ''
  const customers = await getCustomers({
    storeId: storeId
  })

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
              <BreadcrumbPage>Clientes</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex-col min-h-screen bg-background text-foreground">
        <ListCustomers customers={customers.customers} storeId={storeId} />
      </div>
    </>
  )
}