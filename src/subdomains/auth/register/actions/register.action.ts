"use server";

import { z } from "zod";
import { hash } from "bcryptjs"
import { getUserByEmail } from "@/shared/_actions/get-user-by-email";
import { db } from "@/lib/prisma";

const createUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string(),
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

  try {
    const userData = createUserSchema.parse(input);
    const userAlredyExists = await getUserByEmail({ email: userData.email });

    if (userAlredyExists) {
      throw new Error("Este e-mail já está registrado. Tente outro.");
    }

    const hashPassword = await hash(userData.password, 6)

    return await db.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashPassword,
        image: userData.image,
        role: userData.accountType || "CUSTOMER",
        accounts: {
          create: {
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
  } catch (error) {
    throw error;
  }
};
