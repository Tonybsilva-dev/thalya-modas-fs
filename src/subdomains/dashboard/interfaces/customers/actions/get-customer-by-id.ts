
"use server"

import { db } from "@/lib/prisma"
import { z } from "zod"

const getCustomerByIdZodSchema = z.object({
  customerId: z.string().cuid()
})

type getCustomerById = z.infer<typeof getCustomerByIdZodSchema>

export async function getCustomerById({ customerId }: getCustomerById) {
  const customer = await db.customer.findUnique({
    where: {
      id: customerId
    },
    include: {
      promissories: {
        select: {
          status: true,
          totalAmount: true,
          purchases: true,
          _count: {
            select: {
              purchases: true, // Contagem de compras
            },
          },
        },

      },
      adresses: true,
    }
  })

  if (!customer) {
    return null;
  }

  const purchases = customer.promissories.flatMap((promissory) => promissory.purchases);

  const lastThreePurchases = purchases
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3);

  return {
    ...customer,
    lastThreePurchases,
  };
}