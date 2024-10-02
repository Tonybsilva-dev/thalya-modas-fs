import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string({ required_error: 'A DATABASE_URL deve ser adicionada' }).url(),
  NEXTAUTH_SECRET: z.string()
    .min(10, 'NEXTAUTH_SECRET deve ter pelo menos 10 caracteres')
    .default('secret1234'),
  PORT: z.string().default("3000"),
  NODE_ENV: z.enum(['development', 'production', 'test', 'homolog']).default('development'),
  GOOGLE_CLIENT_ID: z.string().default('secret'),
  GOOGLE_CLIENT_SECRET: z.string().default('secret')
});

export type EnvVars = z.infer<typeof envSchema>;
export const validatedEnv = envSchema.parse(process.env);
