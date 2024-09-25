import { NextResponse } from 'next/server';

interface CepData {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  lat: number;
  lng: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cep = searchParams.get('cep');

  if (!cep) {
    return NextResponse.json({ error: 'CEP é obrigatório.' }, { status: 400 });
  }

  if (typeof cep !== 'string') {
    return NextResponse.json({ error: 'CEP deve ser uma string.' }, { status: 400 });
  }

  const sanitizedCep = cep.replace(/\D/g, '');

  if (sanitizedCep.length !== 8) {
    return NextResponse.json({ error: 'CEP inválido. Deve conter 8 dígitos.' }, { status: 400 });
  }

  try {
    // Primeira chamada à API
    const response = await fetch(`https://cep.awesomeapi.com.br/json/${sanitizedCep}`);
    const data = await response.json();

    if (data.code === "not_found") {
      // Caso não encontrado, chama a segunda API
      const fallbackResponse = await fetch(`https://viacep.com.br/ws/${sanitizedCep}/json/`);
      const fallbackData = await fallbackResponse.json();

      if (fallbackData.erro) {
        return NextResponse.json({ error: `CEP ${sanitizedCep} não encontrado em nenhuma das APIs.` }, { status: 404 });
      } else {
        // Mapeia a resposta da ViaCEP para um formato padrão
        const standardizedData: CepData = {
          street: fallbackData.logradouro || '',
          suite: fallbackData.complemento || '',
          city: fallbackData.localidade || '',
          zipcode: fallbackData.cep || '',
          lat: 0, // ViaCEP não fornece latitude
          lng: 0, // ViaCEP não fornece longitude
        };
        return NextResponse.json({ data: standardizedData }, { status: 200 });
      }
    } else {
      const standardizedData: CepData = {
        street: data.address_name || '',
        suite: '',
        city: data.city || '',
        zipcode: data.cep || '',
        lat: parseFloat(data.lat) || 0,
        lng: parseFloat(data.lng) || 0,
      };
      return NextResponse.json({ data: standardizedData }, { status: 200 });
    }
  } catch (error: any) {
    console.error('Erro ao buscar CEP:', error);
    return NextResponse.json({ error: 'Erro interno ao buscar o CEP.' }, { status: 500 });
  }
}
