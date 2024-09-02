"use server";

import { db } from "@/shared/infrastructure/database/prisma";
import { z } from "zod";

// Definindo o esquema de validação com Zod
const createUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  image: z.string().url().optional(),
  accountType: z.enum(["ADMIN", "OWNER", "CUSTOMER"]).optional(),
  storeData: z
    .array(
      z.object({
        name: z.string(),
        description: z.string().optional(),
      })
    )
    .optional(),
});

export const createUser = async (input: any) => {

  const userData = createUserSchema.parse(input);

  return await db.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      image: userData.image,
      accounts: {
        create: {
          type: userData.accountType || "CUSTOMER",
          provider: "credentials",
          providerAccountId: userData.email,
        },
      },
      ...(userData.accountType === "OWNER" && userData.storeData
        ? {
          ownerStores: {
            create: userData.storeData.map((store) => ({
              name: store.name,
              description: store.description,
            })),
          },
        }
        : {}),
    },
  });
};
