import { z } from "zod";

/* Constants  */
export const signUpCredentialsZodSchema = z.object({
  name: z.string({ required_error: "Campo obrigatório" }).min(1, { message: "Campo obrigatório" }),
  email: z.string({ required_error: "Campo obrigatório" }).email({ message: "Email inválido" }),
  password: z.string({ required_error: "Campo obrigatório" }).min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  image: z.string().url().optional(),
  accountType: z.enum(["ADMIN", "OWNER", "CUSTOMER"]).optional(),
});

/* Types  */
export type SignUpCredentails = z.infer<typeof signUpCredentialsZodSchema>