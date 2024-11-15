import z from "zod";

export const signInZodSchema = z.object({
  email: z.string({ required_error: "Campo obrigatório" })
    .min(1, "Campo obrigatório")
    .email("Email inválido"),
  password: z.string({ required_error: "Campo obrigatório" })
    .min(1, "Campo é obrigatório")
    .min(8, "A senha deve ter mais de 8 caracteres")
    .max(32, "A senha deve ter menos de 32 caracteres"),
});

export type SignIn = z.infer<typeof signInZodSchema>
