import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string({ required_error: 'A DATABASE_URL deve ser adicionada' }).url(),
  AUTH_SECRET: z.string()
    .min(10, 'AUTH_SECRET deve ter pelo menos 10 caracteres')
    .default('u3vYjYnjN5GPToFjnjaU9RQPb6ALn6ano5UtMHdAvl4='),
  PORT: z.string().default("3000"),
  NODE_ENV: z.enum(['development', 'production', 'test', 'homolog']).default('development'),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string()
});

export type EnvVars = z.infer<typeof envSchema>;
export const validatedEnv = envSchema.parse(process.env);
