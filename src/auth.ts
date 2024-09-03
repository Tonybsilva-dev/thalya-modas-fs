import NextAuth from 'next-auth';
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "email", placeholder: "Email" },
      },
      async authorize(credentials) {

        let user = null;
        // user object.

        // user = {
        //   id: 1,
        //   name: "Antonio S",
        //   email: "contato@antoniobsilva.com.br"
        // }

        if (!user) {
          return null
        }

        return user
      }
    })
  ]
})