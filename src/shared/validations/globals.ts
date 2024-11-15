import { regex } from "@/lib/utils/regex";
import { z } from "zod";

// Account Type Enum
export const accountEnumZodSchema = z.enum(['ADMIN', 'OWNER', 'CUSTOMER']);
export type AccountEnumType = z.infer<typeof accountEnumZodSchema>;

// Promissory Status Enum
export const promissoryEnumStatusZodSchema = z.enum(['PENDING', 'PAID', 'OVERDUE']);
export type PromissoryStatusType = z.infer<typeof promissoryEnumStatusZodSchema>;

// User Type Schema
export const userZodSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  email: z.string().email({ message: 'Email inválido' }).optional(),
  emailVerified: z.date().optional(),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }).optional(),
  image: z.string().url({ message: 'URL da imagem inválida' }).optional(),
  role: accountEnumZodSchema.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});
export type UserType = z.infer<typeof userZodSchema>;

// Account Type Schema
export const accountZodSchema = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  provider: z.string().min(1, { message: 'O provedor é obrigatório' }),
  providerAccountId: z.string().min(1, { message: 'O ID da conta do provedor é obrigatório' }),
  refreshToken: z.string().optional(),
  accessToken: z.string().optional(),
  expiresAt: z.number().optional(),
  tokenType: z.string().optional(),
  scope: z.string().optional(),
  idToken: z.string().optional(),
  sessionState: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});
export type AccountType = z.infer<typeof accountZodSchema>;

// Geo Type Schema
export const geoZodSchema = z.object({
  id: z.string().cuid().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  ibge: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});
export type GeoType = z.infer<typeof geoZodSchema>;

// Address Type Schema
export const addressZodSchema = z.object({
  id: z.string().cuid().optional(),
  street: z.string().min(3, { message: 'A rua deve ter pelo menos 3 caracteres' }),
  suite: z.string().optional(),
  city: z.string().min(2, { message: 'A cidade deve ter pelo menos 2 caracteres' }),
  zipcode: z.string().regex(regex.cep, { message: 'CEP inválido' }),
  neighborhood: z.string().optional(),
  uf: z.string().regex(regex.uf, { message: 'UF inválida' }).optional(),
  state: z.string().optional(),
  region: z.string().optional(),
  contactId: z.string(),
  geoId: z.string(),
  userId: z.string().optional(),
  storeId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});
export type AddressType = z.infer<typeof addressZodSchema>;

// Contact Type Schema
export const contactZodSchema = z.object({
  id: z.string().cuid().optional(),
  phoneNumber: z.string().regex(regex.phone, { message: 'Telefone inválido' }).optional(),
  emailContact: z.string().email({ message: 'Email inválido' }).optional(),
});
export type ContactType = z.infer<typeof contactZodSchema>;

// Session Type Schema
export const sessionZodSchema = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().min(1, { message: 'O token da sessão é obrigatório' }),
  userId: z.string(),
  expires: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});
export type SessionType = z.infer<typeof sessionZodSchema>;

// Verification Token Type Schema
export const verificationTokenZodSchema = z.object({
  identifier: z.string().min(1, { message: 'O identificador é obrigatório' }),
  token: z.string().nonempty({ message: 'O token é obrigatório' }),
  expires: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});
export type VerificationTokenType = z.infer<typeof verificationTokenZodSchema>;

// Store Type Schema
export const storeZodSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(3, { message: 'O nome da loja deve ter pelo menos 3 caracteres' }),
  thumbnail: z.string().url({ message: 'URL da imagem inválida' }).optional(),
  description: z.string().optional(),
  ownerId: z.string(),
  addressId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});
export type Store = z.infer<typeof storeZodSchema>;

// Customer Type Schema
export const customerZodSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(3, { message: 'O nome do cliente deve ter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }).optional(),
  phone: z.string().regex(regex.phone, { message: 'Telefone inválido' }).optional(),
  document: z.string()
    .regex(regex.cpf, { message: 'CPF inválido' })
    .or(z.string().regex(regex.cnpj, { message: 'CNPJ inválido' }))
    .optional(),
  storeId: z.string(),
  addressId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});
export type CustomerType = z.infer<typeof customerZodSchema>;

// Category Type Schema
export const categoryZodSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(2, { message: 'O nome da categoria deve ter pelo menos 2 caracteres' }),
  description: z.string().optional(),
  storeId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});
export type CategoryType = z.infer<typeof categoryZodSchema>;


// Product Type Schema
export const productZodSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(2, { message: 'O nome do produto deve ter pelo menos 2 caracteres' }),
  description: z.string().optional(),
  price: z.number().positive({ message: 'O preço deve ser positivo' }),
  categoryId: z.string(),
  storeId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});
export type ProductType = z.infer<typeof productZodSchema>;

// Promissory Type Schema
export const promissorySchema = z.object({
  id: z.string().cuid().optional(),
  clientId: z.string(),
  storeId: z.string(),
  totalAmount: z.number().positive({ message: 'O valor total deve ser positivo' }),
  dueDate: z.date(),
  status: promissoryEnumStatusZodSchema.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});
export type PromissoryType = z.infer<typeof promissorySchema>;

// Purchase Type Schema
export const purchaseZodSchema = z.object({
  id: z.string().cuid().optional(),
  promissoryId: z.string(),
  productId: z.string(),
  quantity: z.number().int().positive({ message: 'A quantidade deve ser um número inteiro positivo' }),
  price: z.number().positive({ message: 'O preço deve ser positivo' }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});
export type PurchaseType = z.infer<typeof purchaseZodSchema>;

// Payment Type Schema
export const paymentZodSchema = z.object({
  id: z.string().cuid().optional(),
  promissoryId: z.string(),
  amount: z.number().positive({ message: 'O valor do pagamento deve ser positivo' }),
  paymentDate: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});
export type PaymentType = z.infer<typeof paymentZodSchema>;

export const OwnerIdZodSchema = z.object({
  ownerId: z.string().cuid("ID de usuário inválido"),
});

export type OwnerIdData = z.infer<typeof OwnerIdZodSchema>;

export const UserIdZodSchema = z.object({
  userId: z.string().cuid("ID de usuário inválido"),
});

export type UserIdData = z.infer<typeof UserIdZodSchema>;