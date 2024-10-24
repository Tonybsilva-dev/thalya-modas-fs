"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface NewCustomerData {
  name: string;
  email?: string;
  phone?: string;
  storeId: string;
}

export const createCustomer = async (data: NewCustomerData) => {
  const customer = await db.customer.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      storeId: data.storeId,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  });
  return customer;
};

revalidatePath('/')
revalidatePath('/dashboard/customers')

