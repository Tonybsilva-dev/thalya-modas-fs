import { z } from "zod";

export const OwnerIdZodSchema = z.object({
  ownerId: z.string().cuid("ID de usuário inválido"),
});

export type OwnerIdData = z.infer<typeof OwnerIdZodSchema>;

export const UserIdZodSchema = z.object({
  userId: z.string().cuid("ID de usuário inválido"),
});

export type UserIdData = z.infer<typeof UserIdZodSchema>;