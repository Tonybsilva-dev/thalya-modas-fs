import { db } from "@/lib/prisma";
import { storeSchema } from "../validations/get-store-info.validation";

export const upsertStore = async (input: any) => {
  try {
    const storeData = storeSchema.parse(input);
    const store = await db.store.upsert({
      where: {
        ownerId: storeData.ownerId
      },
      update: {
        // Campos a serem atualizados
        description: storeData.description,
        street: storeData.street,
        suite: storeData.suite,
        city: storeData.city,
        zipcode: storeData.zipcode,
        lat: storeData.lat,
        lng: storeData.lng,
      },
      create: {
        // Campos para criar a loja
        ownerId: storeData.ownerId,
        name: storeData.name,
        description: storeData.description,
        street: storeData.street,
        suite: storeData.suite,
        city: storeData.city,
        zipcode: storeData.zipcode,
        lat: storeData.lat,
        lng: storeData.lng,
      },
    })

    return store
  } catch (error) {
    throw error;
  }
}