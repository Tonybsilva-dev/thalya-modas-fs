'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronRight, Search, UserIcon, UsersIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Prisma } from "@prisma/client";
import EmptyState from "@/components/ui/empty-state";
import AddCustomerModal from "./form-add-customer.component";
import { TitlePage } from "@/components/ui/title-page";
import Image from "next/image";

type Customer = Prisma.CustomerGetPayload<{}>;

interface ListCustomersProps {
  customers: Customer[];
  storeId: string;
}

export default function ListCustomers({ customers, storeId }: ListCustomersProps) {
  const [customersState, setCustomersState] = useState<Customer[]>(customers);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredCustomers = customersState.filter((customer) =>
    customer.name?.toLowerCase().includes(search.toLowerCase()) ||
    customer.email?.toLowerCase().includes(search.toLowerCase()) ||
    customer.phone?.includes(search)
  );

  const addCustomer = (newCustomer: Omit<Customer, 'id'>) => {
    const newId = (customersState.length + 1).toString();
    setCustomersState([...customersState, { id: newId, ...newCustomer }]);
  };

  const goToCustomerProfile = (id: string) => {
    router.push(`/dashboard/customers/${id}/profile`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <TitlePage title="Clientes" />

      <main className="flex-1 py-8">

        <div className="container flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64"
            />
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <AddCustomerModal onCustomerAdded={addCustomer} storeId={storeId} />
        </div>
        <div className="container">
          <Card>
            <CardContent>
              {filteredCustomers.length > 0 ? (
                <ul className="divide-y divide-border mt-6">
                  {filteredCustomers.map((customer) => (
                    <li
                      key={customer.id}
                      className="group flex items-center justify-between p-4 hover:bg-accent cursor-pointer transition-colors"
                      onClick={() => goToCustomerProfile(customer.id)}
                    >
                      <div className="flex items-center space-x-8">
                        <div className="border w-10 h-10 flex items-center justify-center rounded-full group-hover:bg-white">
                          <UserIcon className="w-6 h-6 group-hover:text-black" />
                        </div>
                        <div>
                          <h3 className="font-medium">{customer.name}</h3>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-8">
                  <EmptyState title="Nenhum cliente encontrado." icon={UsersIcon} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main >
    </div>
  );
}
