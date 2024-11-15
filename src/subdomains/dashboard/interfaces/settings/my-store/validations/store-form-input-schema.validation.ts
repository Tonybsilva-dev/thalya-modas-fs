import { regex } from '@/lib/utils/regex';
import { z } from 'zod';

export const storeFormInputSchema = z.object({
  ownerId: z.string(),
  name: z.string({ message: 'O nome da loja é obrigatório' })
    .min(3, { message: 'O nome da loja é obrigatório' }),
  description: z.string().optional(),
  street: z.string().min(3, { message: 'A rua é obrigatória' }),
  complement: z.string().optional(),
  city: z.string().min(3, { message: 'A cidade é obrigatória' }),
  state: z.string().optional(),
  neighborhood: z.string().optional(),
  zipcode: z.string().regex(regex.cep, { message: 'CEP inválido' }),
  uf: z.string().regex(regex.uf, { message: 'UF inválida' }),
  storeMail: z.string().email({ message: 'Email inválido' }).optional(),
  storePhone: z
    .string()
    .transform((val) => val.replace(/\D/g, ''))
    .optional(),
  ibge: z
    .preprocess((val) => {
      if (typeof val === 'string') {
        const parsed = parseInt(val, 10);
        return isNaN(parsed) ? undefined : parsed;
      }
      return val;
    }, z.number())
    .optional()
    .default(0), lat: z.number().default(0),
  lng: z.number().default(0),
});

export type StoreFormInputData = z.infer<typeof storeFormInputSchema>;

// Store Data Type Schema
export const storeDataSchema = z.object({
  id: z.string().cuid(),
  ownerId: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  address: z
    .object({
      id: z.string().cuid(),
      street: z.string(),
      suite: z.string().nullable().optional(),
      city: z.string(),
      state: z.string().nullable().optional(),
      neighborhood: z.string().nullable().optional(),
      zipcode: z.string(),
      uf: z.string(),
      geo: z
        .object({
          id: z.string().cuid(),
          ibge: z.number().nullable().optional().default(0),
          lat: z.number(),
          lng: z.number(),
        })
        .nullable()
        .optional(),
      contact: z
        .object({
          id: z.string().cuid(),
          emailContact: z.string().nullable().optional(),
          phoneNumber: z.string().nullable().optional(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional(),
});
export type StoreData = z.infer<typeof storeDataSchema>;
