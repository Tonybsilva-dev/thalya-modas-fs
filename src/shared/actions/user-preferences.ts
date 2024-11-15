"use server"

import { db } from "@/lib/prisma";
import { z } from "zod";

const userPreferesZodSchema = z.object({
  userId: z.string().cuid(),
  key: z.string(),
  value: z.string(),
})

export type UserPreferenceType = z.infer<typeof userPreferesZodSchema>;

export const setUserPreferences = async (input: UserPreferenceType) => {

  const { userId, key, value } = userPreferesZodSchema.parse(input)

  return await db.userPreference.upsert({
    where: {
      userId_key: {
        userId,
        key,
      },
    },
    update: { value },
    create: { userId, key, value },
  });
}

const getUserPreferenceZodSchema = z.object({
  userId: z.string().cuid(),
  key: z.string(),
});

export type GetUserPreferenceType = z.infer<typeof getUserPreferenceZodSchema>;

export async function getUserPreferences(input: GetUserPreferenceType) {
  const { userId, key } = getUserPreferenceZodSchema.parse(input);

  return await db.userPreference.findUnique({
    where: {
      userId_key: {
        userId,
        key,
      },
    },
  });
}

export async function getManyUserPreferences(userId: string) {
  return await db.userPreference.findMany({
    where: {
      userId
    }
  })
}