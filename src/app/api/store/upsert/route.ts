import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { createId, isCuid } from '@paralleldrive/cuid2';
import { StoreFormData, storeSchema } from '@/subdomains/dashboard/interfaces/settings/my-store/validations/get-store-info.validation';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  const userId = session.user.id;

  try {

    const body = await request.json();

    const validatedData = storeSchema.parse({
      ...body,
      ownerId: userId,
    }) as StoreFormData;


    const store = await prisma.store.upsert({
      where: { ownerId: userId },
      update: {
        name: validatedData.name,
        description: validatedData.description,
      },
      create: {
        ownerId: userId,
        name: validatedData.name,
        description: validatedData.description,
      },
    });

    const address = await prisma.address.upsert({
      where: { storeId: store.id },
      include: {
        geo: true
      },
      update: {
        street: validatedData.street,
        suite: validatedData.suite ?? '',
        city: validatedData.city,
        zipcode: validatedData.zipcode,
        uf: validatedData.uf
      },
      create: {
        store: {
          connect: { id: store.id },
        },
        street: validatedData.street,
        suite: validatedData.suite ?? '',
        city: validatedData.city,
        zipcode: validatedData.zipcode,
        geo: {
          create: {
            lat: validatedData.lat,
            lng: validatedData.lng,
            ibge: validatedData.ibge ?? 0,
          },
        },
        contact: {
          create: {
            phoneNumber: validatedData.storePhone ?? '',
            emailContact: validatedData.storeMail ?? '',
          },
        },
      },
    })

    const geo = await prisma.geo.upsert({
      where: { id: address.geoId ?? '' },
      update: {
        lat: validatedData.lat,
        lng: validatedData.lng,
        ibge: validatedData.ibge,
      },
      create: {
        lat: validatedData.lat,
        lng: validatedData.lng,
        ibge: validatedData.ibge,
      },
    });

    await prisma.store.update({
      where: { id: store.id },
      data: {
        addressId: address.id,
      },
    });

    return NextResponse.json({ store }, { status: 200 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Erro no servidor.' }, { status: 500 });
  }
}


export async function GET(request: Request) {
  return NextResponse.json({ message: 'Método GET não permitido.' }, { status: 405 });
}
