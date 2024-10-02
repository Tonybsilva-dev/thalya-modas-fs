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
      products: true,
      address: {
        include: {
          geo: true,
          contact: true,
        }
      },
    }
  });

  if (!store) return null;

  return {
    ownerId: store.ownerId,
    name: store.name,
    description: store.description || "",
    street: store.address?.street || "",
    suite: store.address?.suite || "",
    city: store.address?.city || "",
    uf: store.address?.uf || "",
    zipcode: store.address?.zipcode || "",
    lat: store.address?.geo.lat || 0,
    lng: store.address?.geo.lng || 0,
    ibge: store.address?.geo.ibge || 0,
    storeMail: store.address?.contact.emailContact || "",
    storePhone: store.address?.contact.phoneNumber || ""
  };
}