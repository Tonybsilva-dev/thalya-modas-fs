import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { getCustomers } from "./actions/get-customers";
import ListCustomers from "./components/list-customers.component";

export const MyCustomersInterface = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound()
  }
  const storeId = session.user.storeId

  if (!storeId) {
    return redirect('/dashboard')
  }

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
        <ListCustomers customers={customers.customers} storeId={storeId ?? ''} />
      </div>
    </>
  )
}