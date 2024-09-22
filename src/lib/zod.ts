import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Campo obrigatório" })
    .min(1, "Campo obrigatório")
    .email("Email inválido"),
  password: string({ required_error: "Campo obrigatório" })
    .min(1, "Campo é obrigatório")
    .min(8, "A senha deve ter mais de 8 caracteres")
    .max(32, "A senha deve ter menos de 32 caracteres"),
});
