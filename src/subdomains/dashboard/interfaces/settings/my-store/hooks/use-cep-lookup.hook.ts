import { useState } from 'react';
import { StoreFormData } from '../validations/get-store-info.validation';
import { UseFormSetValue } from 'react-hook-form';
import { toast } from 'sonner';

interface CepLookupResult {
  isLoading: boolean;
  handleCepLookup: (cep: string) => Promise<void>;
}

export function useCepLookup(setValue: UseFormSetValue<StoreFormData>): CepLookupResult {
  const [isLoading, setIsLoading] = useState(false);

  const handleCepLookup = async (cep: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/utils/cep?cep=${cep}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao buscar o CEP.');
      }

      const result = await response.json();

      if (result.data) {
        const { street, suite, city, zipcode, lat, lng, ibge, district, uf, state } = result.data;

        setValue('street', street);
        setValue('complement', suite);
        setValue('city', city);
        setValue('state', state);
        setValue('zipcode', zipcode);
        setValue('lat', lat);
        setValue('lng', lng);
        setValue('ibge', ibge);
        setValue('neighborhood', district);
        setValue('uf', uf);

        toast.success('CEP encontrado e campos foram preenchidos automaticamente.');
      } else if (result.error) {
        toast.error(result.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCepLookup };
}
