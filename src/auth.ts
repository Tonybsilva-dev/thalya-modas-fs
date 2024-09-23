// export const runtime = 'nodejs';

import NextAuth from 'next-auth';
import { authOptions } from './lib/auth';


export const { signIn, signOut, isLoggedIn, auth } = NextAuth(authOptions)