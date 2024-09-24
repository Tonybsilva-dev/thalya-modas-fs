// app/api/store/upsert/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { StoreFormData, storeSchema } from '@/subdomains/dashboard/interfaces/settings/my-store/validations/get-store-info.validation';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  console.log("Recebido método POST na rota /api/store/upsert");

  // Obter a sessão do usuário
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    console.log("Usuário não autenticado.");
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    // Obter o corpo da requisição
    const body = await request.json();
    console.log("Dados recebidos:", body);

    // Validar os dados recebidos com Zod
    const validatedData = storeSchema.parse({
      ...body,
      ownerId: userId,
    }) as StoreFormData;

    // Upsert no banco de dados
    const store = await prisma.store.upsert({
      where: { ownerId: userId },
      update: {
        name: validatedData.name,
        description: validatedData.description,
        street: validatedData.street,
        suite: validatedData.suite,
        city: validatedData.city,
        zipcode: validatedData.zipcode,
        lat: validatedData.lat,
        lng: validatedData.lng,
      },
      create: {
        ownerId: userId,
        name: validatedData.name,
        description: validatedData.description,
        street: validatedData.street,
        suite: validatedData.suite,
        city: validatedData.city,
        zipcode: validatedData.zipcode,
        lat: validatedData.lat,
        lng: validatedData.lng,
      },
    });

    console.log("Loja upserted:", store);

    return NextResponse.json({ store }, { status: 200 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.error("Erro de validação:", error.errors);
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    console.error("Erro no upsert da loja:", error);
    return NextResponse.json({ message: 'Erro no servidor.' }, { status: 500 });
  }
}

// Opcional: Definir o método GET como não permitido
export async function GET(request: Request) {
  console.log("Recebido método GET na rota /api/store/upsert");
  return NextResponse.json({ message: 'Método GET não permitido.' }, { status: 405 });
}
