import { db } from '@/lib/prisma';
import { OwnerIdData } from '@/shared/validations/globals';
import { StoreData, storeDataSchema } from '../validations/store-form-input-schema.validation';

export async function getStoreInfo({ ownerId }: OwnerIdData): Promise<StoreData | null> {
  const store = await db.store.findUnique({
    where: {
      ownerId,
    },
    include: {
      address: {
        include: {
          geo: true,
          contact: true,
        },
      },
    },
  });

  if (!store) {
    return null;
  }

  const validatedStore = storeDataSchema.parse(store);

  return validatedStore;
}
