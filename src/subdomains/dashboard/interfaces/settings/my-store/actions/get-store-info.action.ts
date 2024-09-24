import { db } from '@/lib/prisma';
import { StoreFormData } from '../validations/get-store-info.validation';

export async function getStoreInfo(userId: string): Promise<StoreFormData | null> {
  const store = await db.store.findUnique({
    where: {
      ownerId: userId,
    },
    include: {
      customers: true,
      promissories: true,
      categories: true,
      products: true
    }
  });

  if (!store) return null;

  return {
    ownerId: store.ownerId,
    name: store.name,
    description: store.description || "",
    street: store.street,
    suite: store.suite || "",
    city: store.city,
    zipcode: store.zipcode,
    lat: store.lat,
    lng: store.lng,
  };
}