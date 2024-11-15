import { db } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { SignUpCredentails, signUpCredentialsZodSchema } from "../validations/sign-up.validation";
import { User } from "@prisma/client";

// TODO: função auxiliar global.
// Função para verificar se o usuário já existe por email
export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({ where: { email } });
};

export class SignupRepository {
  async signUpCredentials(data: SignUpCredentails): Promise<User> {
    try {
      // Verificar se o usuário ja existe
      const userCredentials = await getUserByEmail(data.email)

      if (userCredentials) {
        // TODO: Adicionar um gerador de erros global.
        throw new Error('Este e-mail ja está cadastrado')
      }

      const userData = signUpCredentialsZodSchema.parse(data);
      const hashedPassword = await hash(userData.password, 6);

      return await db.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          image: userData.image,
          role: "OWNER",
          accounts: {
            create: {
              provider: "credentials",
              providerAccountId: userData.email,
            },
          },
        },
      })
    } catch (error) {
      // TODO: Adicionar um gerador de erros global.
      throw error
    }
  }
}