import { z } from "zod";

export const addCustomerZodSchema = z.object({
  name: z.string().min(1, {
    message: "Campo obrigatório",
  }),
  email: z
    .string()
    .email({
      message: "Endereço de e-mail inválido.",
    })
    .optional(),
  phone: z
    .string()
    .min(11, {
      message: "O número de telefone deve ter pelo menos 11 dígitos.",
    })
    .optional(),
});

export type CustomerFormData = z.infer<typeof addCustomerZodSchema>;