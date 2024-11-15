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
  console.log('DATA: ', data)
  try {
    const store = await db.store.findUnique({
      where: {
        id: data.storeId
      }
    })

    if (!store) {
      throw new Error('Loja não encontrada ou cadastrada.')
    }

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
  } catch (error) {
    throw error
  }

};

revalidatePath('/')
revalidatePath('/dashboard/customers')

