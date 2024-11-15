import { z } from 'zod';

export const storeSchema = z.object({
  ownerId: z.string().cuid("ID de usuário inválido"),
  name: z.string().min(1, "O nome da loja é obrigatório"),
  description: z.string().optional(),
  image: z.string().url().optional(),
  street: z.string().min(1, "A rua é obrigatória"),
  neighborhood: z.string().optional(),
  complement: z.string().optional(),
  city: z.string().min(1, "A cidade é obrigatória"),
  zipcode: z.string().min(1, "O CEP é obrigatório"),
  uf: z.string().min(2, "O uf é obrigatório"),
  state: z.string().optional(),
  region: z.string().optional(),
  lat: z.preprocess(
    (val) => (typeof val === 'string' ? parseFloat(val) : val),
    z.number().min(-90).max(90, "Latitude inválida")
  ).default(0),
  lng: z.preprocess(
    (val) => (typeof val === 'string' ? parseFloat(val) : val),
    z.number().min(-180).max(180, "Longitude inválida")
  ).default(0),
  ibge: z.preprocess(
    (val) => (typeof val === 'string' ? parseInt(val, 10) : val),
    z.number()
  ),
  storePhone: z.string().min(1, "Um número para contato é obrigatório"),
  storeMail: z.string().email("Email inválido").optional()
});

export type StoreFormData = z.infer<typeof storeSchema>;