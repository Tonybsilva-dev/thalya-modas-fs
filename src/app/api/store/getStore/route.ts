import { db } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ownerId = searchParams.get('ownerId');

  if (!ownerId) {
    return NextResponse.json({ message: 'ownerId é necessário.' }, { status: 400 });
  }

  try {
    const store = await db.store.findUnique({
      where: { ownerId },
    });

    if (!store) {
      return NextResponse.json({ message: 'Loja não encontrada.' }, { status: 404 });
    }

    return NextResponse.json({ store }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro no servidor.' }, { status: 500 });
  }
}