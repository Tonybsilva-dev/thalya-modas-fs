import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { getCustomerById } from "../../actions/get-customer-by-id"
import { PageProps } from "@/shared/types/global/page-props.type";
import { TitlePage } from "@/components/ui/title-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityIcon, Badge, CalendarDaysIcon, DollarSignIcon, Edit, MailIcon, MapPinIcon, PackageOpenIcon, PhoneIcon, ShoppingCartIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@/components/ui/separator";
import EmptyState from "@/components/ui/empty-state";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils/format-date";

export async function ProfileCustomerInterface({ params, searchParams }: PageProps) {
  const { id } = params;
  const customer = await getCustomerById({ customerId: id })

  console.log('Dados do cliente:', customer); // Adicione este log

  const totalPurchases = customer?.promissories?.reduce((acc, promissory) => {
    return acc + (promissory._count?.purchases || 0);
  }, 0) || 0;

  const latestPromissory = customer?.promissories?.[0];
  const promissoryStatus = latestPromissory?.status || 'Desconhecido';
  const promissoryTotalAmount = latestPromissory?.totalAmount || 0;

  const CUSTOMER_FIRST_NAME = customer?.name.split(' ')[0]

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
              <BreadcrumbLink href="/dashboard/customers">Clientes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{customer?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex-col min-h-screen bg-background text-foreground">
        <TitlePage title={`Perfil de ${CUSTOMER_FIRST_NAME}`}>
          <Button> Action </Button>
        </TitlePage>

        <main className="flex-1 py-8">
          <div className="container gap-8 px-4 md:px-6">
            <h3 className="text-lg font-semibold">Estatísticas</h3>
            {
              customer?.promissories.length === 0 && customer?.lastThreePurchases.length === 0 ? (
                <EmptyState title={`${CUSTOMER_FIRST_NAME} não possui estatísticas`} icon={ActivityIcon} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total de pedidos</CardTitle>
                      <ShoppingCartIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalPurchases}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Dívida total</CardTitle>
                      <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">R$ {promissoryTotalAmount.toFixed(2)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Status</CardTitle>
                      <CalendarDaysIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{promissoryStatus}</div>
                    </CardContent>
                  </Card>
                </div>
              )
            }
          </div>
          <div className="mt-8 container grid gap-8 px-4 md:px-6">
            <h3 className="text-lg font-semibold">Pedidos recentes</h3>
            {
              customer?.lastThreePurchases.length === 0 ? (
                <EmptyState title={`${CUSTOMER_FIRST_NAME} não realizou compras recentemente`} icon={PackageOpenIcon} />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customer?.lastThreePurchases.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                        <TableCell>R$ {order.price.toFixed(2)}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )
            }
          </div>
        </main>
      </div>
    </>
  )
}