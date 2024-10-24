"use server"

import { db } from "@/lib/prisma";
import { z } from "zod"

const getUserByEmailSchema = z.object({
  email: z.string().email()
})

export type getUserByEmailType = z.infer<typeof getUserByEmailSchema>;

export const getUserByEmail = async (input: getUserByEmailType) => {

  const { email } = getUserByEmailSchema.parse(input)

  return await db.user.findFirst({
    where: {
      email
    }
  })
}