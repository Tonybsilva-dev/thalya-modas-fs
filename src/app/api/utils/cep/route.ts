import { NextResponse } from 'next/server';

interface CepData {
  zipcode: string;
  address_type?: string;     // Primeiro retorno
  address_name?: string;     // Primeiro retorno
  street?: string;           // Primeiro retorno
  district?: string;         // Primeiro retorno
  lat?: string;              // Primeiro retorno
  lng?: string;              // Primeiro retorno
  city: string;
  ddd?: string;
  suite?: string;            // Segundo retorno
  unit?: string;             // Segundo retorno
  uf: string;                // Comum a ambos
  state?: string;            // Segundo retorno
  region?: string;           // Segundo retorno
  ibge?: string;             // Segundo retorno
  gia?: string;              // Segundo retorno
  siafi?: string;            // Segundo retorno
}

type FirstApiData = Omit<CepData, 'suite' | 'unit' | 'state' | 'region' | 'gia' | 'siafi'>;

type SecondApiData = Omit<CepData, 'address_type' | 'address_name' | 'address' | 'lat' | 'lng' | 'city_ibge'>;

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
        const standardizedData: SecondApiData = {
          street: fallbackData.logradouro || '',
          suite: fallbackData.complemento || '',
          city: fallbackData.localidade || '',
          zipcode: fallbackData.cep || '',
          uf: fallbackData.uf || '',
          state: fallbackData.estado || '',
          region: fallbackData.regiao || '',
          ibge: fallbackData.ibge || 0,
          gia: fallbackData.gia || 0,
          ddd: fallbackData.ddd || '',
          siafi: fallbackData.estado || ''
        };
        return NextResponse.json({ data: standardizedData }, { status: 200 });
      }
    } else {
      const standardizedData: FirstApiData = {
        street: data.address_name || '',
        district: data.district || '',
        city: data.city || '',
        ibge: data.city_ibge || '',
        uf: data.state || '',
        zipcode: data.cep || '',
        lat: data.lat || '',
        lng: data.lng || '',
        ddd: data.ddd || '',
      };
      return NextResponse.json({ data: standardizedData }, { status: 200 });
    }
  } catch (error: any) {
    console.error('Erro ao buscar CEP:', error);
    return NextResponse.json({ error: 'Erro interno ao buscar o CEP.' }, { status: 500 });
  }
}
