// app/dashboard/settings/components/StoreForm.tsx

'use client';

import React, { useEffect, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { StoreFormData, storeSchema } from '../validations/get-store-info.validation';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { formatDate } from '@/shared/helpers/format-date';
import { z } from 'zod';
import ErrorMessage from '@/components/ui/error-message';
import { useSession } from 'next-auth/react';
import { Spinner } from '@/components/ui/spinner';

interface StoreFormProps {
  initialData: StoreFormData | null;
}

export interface StoreFormHandle {
  submitForm: () => void;
}

const StoreForm = forwardRef<StoreFormHandle, StoreFormProps>(({ initialData }, ref) => {
  const { data: session } = useSession();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: initialData || {
      ownerId: session?.user.id || "",
      name: "",
      description: "",
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      lat: 0,
      lng: 0,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const zipcode = watch('zipcode');

  const [debouncedZipcode] = useDebounce(zipcode, 500);
  const [cepLookupCompleted, setCepLookupCompleted] = useState(false);

  useEffect(() => {

    if (!initialData) {
      reset({
        ownerId: session?.user.id || "",
        name: "",
        description: "",
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        lat: 0,
        lng: 0,
      });
    }


  }, [initialData, reset, session?.user.id]);

  useEffect(() => {
    if (initialData?.zipcode !== debouncedZipcode && !cepLookupCompleted) {
      const sanitizedCep = debouncedZipcode?.replace(/\D/g, '');

      if (sanitizedCep.length === 8) {
        handleCepLookup(sanitizedCep);
        setCepLookupCompleted(true);
      } else if (sanitizedCep.length > 0 && sanitizedCep.length < 8) {
        toast.error('CEP inválido. Deve conter 8 dígitos.');
      }
    }
  }, [debouncedZipcode, initialData?.zipcode, cepLookupCompleted]);

  const handleCepLookup = async (cep: string) => {
    setIsLoading(true);
    setCepLookupCompleted(false);
    try {
      const response = await fetch(`/api/utils/cep?cep=${cep}`);
      console.log(response)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao buscar o CEP.');
      }

      const result = await response.json();

      if (result.data) {
        const { street, suite, city, zipcode, lat, lng } = result.data;

        setValue('street', street || '');
        setValue('suite', suite || '');
        setValue('city', city || '');
        setValue('zipcode', zipcode || '');
        setValue('lat', lat);
        setValue('lng', lng);

        toast.success('CEP encontrado e campos preenchidos automaticamente.');
      } else if (result.error) {
        toast.error(result.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: StoreFormData) => {
    try {
      const response = await fetch('/api/store/upsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          const formattedErrors = errorData.errors
            .map((e: any) => `${e.path.join(".")}: ${e.message}`)
            .join(", ");
          toast.warning(`Erros de validação: ${formattedErrors}`);
        } else {
          throw new Error(errorData.message || 'Erro desconhecido');
        }
        return;
      }

      await response.json();
      toast.success("Dados atualizados com sucesso.", {
        description: formatDate(new Date()),
      });


    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join(", ");

        toast.warning(`Erros de validação: ${formattedErrors}`);
      }
      else if (error instanceof Error) {
        toast.error(error.message, {
          description: formatDate(new Date()),
        });
      }
      else {
        toast.error("Ocorreu um erro inesperado.", {
          description: formatDate(new Date()),
        });
      }
    }
  };

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      handleSubmit(onSubmit)();
    }
  }));

  return (
    <form id="store-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 space-y-2">
        <div className='space-y-2'>
          <label className="block text-sm font-medium">Nome da Loja</label>
          <Input
            {...register('name')}
            type="text"
            placeholder="Nome da Loja"
            disabled={isLoading}
          />
          <ErrorMessage error={errors.name} />
        </div>
        <div className='space-y-2'>
          <label className="block text-sm font-medium">Descrição</label>
          <Textarea
            {...register('description')}
            placeholder="Descrição da Loja"
            disabled={isLoading}
          />
          <ErrorMessage error={errors.description} />
        </div>
        {isLoading ? <Spinner /> : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 space-y-2">
            <div className='space-y-2 mt-2'>
              <label className="block text-sm font-medium">Rua</label>
              <Input
                {...register('street')}
                type="text"
                placeholder="Rua"
                disabled={isLoading}
              />
              <ErrorMessage error={errors.street} />
            </div>
            <div className='space-y-2'>
              <label className="block text-sm font-medium">Apartamento/Suite</label>
              <Input
                {...register('suite')}
                type="text"
                placeholder="Apartamento/Suite"
                disabled={isLoading}
              />
              <ErrorMessage error={errors.suite} />
            </div>
            <div className='space-y-2'>
              <label className="block text-sm font-medium">Cidade</label>
              <Input
                {...register('city')}
                type="text"
                placeholder="Cidade"
                disabled={isLoading}
              />
              <ErrorMessage error={errors.city} />
            </div>
            <div className='space-y-2'>
              <div className='flex flex-1 justify-between'>
                <label className="block text-sm font-medium">CEP</label>
                <label className="block text-sm font-small">Informe o CEP para obter os dados.</label>

              </div>
              <Input
                {...register('zipcode')}
                type="text"
                placeholder="CEP"
                disabled={isLoading}
              />
              <ErrorMessage error={errors.zipcode} />
            </div>
          </div>
        )}
      </div>
    </form>
  );
});

StoreForm.displayName = 'StoreForm';

export default StoreForm;
