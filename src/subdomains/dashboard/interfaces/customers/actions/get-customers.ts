'use server';

import { db } from "@/lib/prisma";
import { Prisma } from '@prisma/client';

interface GetStoreCustomersParams {
  storeId: string;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  sortBy?: 'name' | 'email' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export async function getCustomers({
  storeId,
  page = 1,
  pageSize = 10,
  searchTerm,
  sortBy = 'createdAt',
  sortOrder = 'asc',
}: GetStoreCustomersParams) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const whereClause: Prisma.CustomerWhereInput = {
    storeId,
    ...(searchTerm && {
      OR: [
        { name: { contains: searchTerm, mode: Prisma.QueryMode.insensitive } },
        { email: { contains: searchTerm, mode: Prisma.QueryMode.insensitive } },
        { phone: { contains: searchTerm } },
      ],
    }),
  };

  const [customers, totalCustomers] = await Promise.all([
    db.customer.findMany({
      where: whereClause,
      skip,
      take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),
    db.customer.count({
      where: whereClause,
    }),
  ]);

  const totalPages = Math.ceil(totalCustomers / pageSize);

  return {
    customers,
    totalCustomers,
    totalPages,
    currentPage: page,
  };
}
