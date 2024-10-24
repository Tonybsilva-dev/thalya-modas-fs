import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { signInSchema } from '../lib/zod';
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from '../lib/prisma';
import { verifyPassword } from './utils/crypto';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    signOut: "/"
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials) {
        const parsedCredentials = signInSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          throw new Error("Credenciais inválidas");
        }

        const user = await db.user.findUnique({
          where: { email: parsedCredentials.data.email },
          include: {
            Store: true
          }
        });

        if (!user) {
          throw new Error("Credenciais inválidas");
        }

        const isValidPassword = await verifyPassword(
          parsedCredentials.data.password,
          user.password as string
        );

        if (!isValidPassword) {
          throw new Error("Credenciais inválidas");
        }

        // Remover o campo password antes de retornar o usuário
        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
      },
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const existingUser = await db.user.findUnique({
          where: {
            email: user.email ?? ""
          }
        })

        if (!existingUser) {
          await db.user.create({
            data: {
              email: user.email,
              name: user.name?.toUpperCase(),
              image: user.image,
              role: "CUSTOMER",
              accounts: {
                create: {
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                }
              }
            }
          })
        }
      }
      return true
    },
    async jwt({ token, user, trigger, session }) {
      // Initial sign-in
      if (user) {
        token.id = user.id;
        token.role = user.role;

        // If the user is an OWNER, fetch their store
        if (user.role === "OWNER") {
          const ownerStore = await db.store.findUnique({
            where: {
              ownerId: user.id,
            },
            select: {
              id: true,
            },
          });

          if (ownerStore) {
            token.storeId = ownerStore.id;
          } else {
            token.storeId = undefined; // No store registered yet
          }
        }
      } else {
        // Subsequent requests
        // Ensure token has necessary properties
        if (!token.role || !token.id) {
          const dbUser = await db.user.findUnique({
            where: { id: token.id },
            select: { role: true },
          });
          token.role = dbUser?.role || 'CUSTOMER';
        }

        // If token indicates user is an OWNER but storeId is missing
        if (token.role === "OWNER" && !token.storeId) {
          const ownerStore = await db.store.findUnique({
            where: {
              ownerId: token.id,
            },
            select: {
              id: true,
            },
          });

          if (ownerStore) {
            token.storeId = ownerStore.id;
          } else {
            token.storeId = undefined;
          }
        }
      }

      return token;
    },

    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.storeId = token.storeId
      }
      return session;
    }
  }
}