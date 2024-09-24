import { z } from 'zod';

export const getStoreSchema = z.object({
  ownerId: z.string().cuid("ID de usuário inválido"),
});

export const storeSchema = z.object({
  ownerId: z.string().cuid("ID de usuário inválido"),
  name: z.string().min(1, "O nome da loja é obrigatório"),
  description: z.string().optional(),
  image: z.string().url().optional(),
  street: z.string().min(1, "A rua é obrigatória"),
  suite: z.string().optional(),
  city: z.string().min(1, "A cidade é obrigatória"),
  zipcode: z.string().min(1, "O CEP é obrigatório"),
  lat: z.number().min(-90).max(90, "Latitude inválida"),
  lng: z.number().min(-180).max(180, "Longitude inválida"),
});



export type StoreFormData = z.infer<typeof storeSchema>;