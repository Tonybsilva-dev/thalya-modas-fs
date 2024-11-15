'use client';

import React, { useEffect, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ErrorMessage from '@/components/ui/error-message';
import { useSession } from 'next-auth/react';
import HelperMessage from '@/components/ui/helper-message';
import UfSelect from '@/components/ui/uf-select';
import { StoreData, StoreFormInputData, storeFormInputSchema } from '../validations/store-form-input-schema.validation';
import { useStoreFormSubmit } from '../hooks/use-store-form-submit.hook';
import { toast } from 'sonner';

interface StoreFormProps {
  initialData: StoreData | null;
}

export interface StoreFormHandle {
  submitForm: () => void;
}

const StoreForm = forwardRef<StoreFormHandle, StoreFormProps>(({ initialData }, ref) => {
  const { data: session, status } = useSession();

  const defaultValues: StoreFormInputData = {
    ownerId: session?.user?.id || '',
    name: initialData?.name || '',
    description: initialData?.description || '',
    street: initialData?.address?.street || '',
    complement: initialData?.address?.suite || '',
    city: initialData?.address?.city || '',
    state: initialData?.address?.state || '',
    neighborhood: initialData?.address?.neighborhood || '',
    zipcode: initialData?.address?.zipcode || '',
    uf: initialData?.address?.uf || '',
    storeMail: initialData?.address?.contact?.emailContact || '',
    storePhone: initialData?.address?.contact?.phoneNumber || '',
    ibge: initialData?.address?.geo?.ibge || 0,
    lat: initialData?.address?.geo?.lat || 0,
    lng: initialData?.address?.geo?.lng || 0,
  };

  const { isSubmitting, onSubmit } = useStoreFormSubmit();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    control
  } = useForm<StoreFormInputData>({
    resolver: zodResolver(storeFormInputSchema),
    defaultValues,
  });

  const zipcode = watch('zipcode');
  const [debouncedZipcode] = useDebounce(zipcode, 1000);

  const handleCepLookup = async (cep: string) => {
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
        setValue('state', state)
        setValue('zipcode', zipcode);
        setValue('lat', lat);
        setValue('lng', lng);
        setValue('ibge', ibge)
        setValue('neighborhood', district)
        setValue('uf', uf)

        toast.success('CEP encontrado e campos foram preenchidos automaticamente.');
      } else if (result.error) {
        toast.error(result.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      handleSubmit(onSubmit)();
    }
  }));

  useEffect(() => {
    reset(defaultValues);
  }, [initialData, reset]);

  useEffect(() => {
    if (!defaultValues || defaultValues.zipcode !== debouncedZipcode) {
      const sanitizedCep = debouncedZipcode?.replace(/\D/g, '');

      if (sanitizedCep?.length === 8) {
        handleCepLookup(sanitizedCep);
      }
    }
  }, [debouncedZipcode]);

  return (
    <form id="store-form" onSubmit={handleSubmit(onSubmit)} aria-disabled={isSubmitting} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
        <section className='space-y-2'>
          <h2 className="text-lg font-semibold mb-4">Dados da loja</h2>
          <div className='space-y-2'>
            <label className="block text-sm font-medium">Nome da Loja</label>
            <Input
              {...register('name')}
              type="text"
              placeholder="Nome da Loja"
            />
            <ErrorMessage error={errors.name} />
          </div>
          <div className='space-y-2'>
            <label className="block text-sm font-medium">Descrição</label>
            <Textarea
              {...register('description')}
              placeholder="Descrição da Loja"
            />
            <ErrorMessage error={errors.description} />
          </div>
        </section>
        <section className='space-y-2'>
          <h2 className="text-lg font-semibold mb-4">Endereço</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className='space-y-2'>
              <label className="block text-sm font-medium">Rua</label>
              <Input
                {...register('street')}
                type="text"
                placeholder="Rua"
              />
              <ErrorMessage error={errors.street} />
            </div>
            <div className='space-y-2'>
              <label className="block text-sm font-medium">Complemento</label>
              <Input
                {...register('complement')}
                type="text"
                placeholder="Ex: N 66, Apto. 102"
              />
              <ErrorMessage error={errors.complement} />
            </div>
            <div className='space-y-2'>
              <label className="block text-sm font-medium">Cidade</label>
              <Input
                {...register('city')}
                type="text"
                placeholder="Cidade"
              />
              <ErrorMessage error={errors.city} />
            </div>
            <div className='space-y-2'>
              <div className='flex flex-1 justify-between'>
                <label className="block text-sm font-medium">CEP</label>
                <HelperMessage message='Informe o CEP para obter os dados.' />
              </div>
              <Input
                {...register('zipcode')}
                type="text"
                placeholder="CEP"
              />
              <ErrorMessage error={errors.zipcode} />
            </div>
            <div className='space-y-2'>
              <label className="block text-sm font-medium">Bairro</label>
              <Input
                {...register('neighborhood')}
                type="text"
                placeholder="Bairro"
              />
              <ErrorMessage error={errors.neighborhood} />
            </div>
            <div className='space-y-2'>
              <label className="block text-sm font-medium">Estado</label>
              <Controller
                name="uf"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <UfSelect value={field.value} onValueChange={field.onChange} />
                )}
              />
              <ErrorMessage error={errors.uf} />
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-4">Contato</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <div className='space-y-2'>
              <label className="block text-sm font-medium">Telefone Comercial</label>
              <Input
                {...register('storePhone')}
                type="text"
                placeholder="Telefone/Celular"
              />
              <ErrorMessage error={errors.storePhone} />
            </div>
            <div className='space-y-2'>
              <label className="block text-sm font-medium">Email Comercial</label>
              <Input
                {...register('storeMail')}
                type="text"
                placeholder="Email"
              />
              <ErrorMessage error={errors.storeMail} />
            </div>
          </div>
        </section>
      </div>
    </form>
  );
});

StoreForm.displayName = 'StoreForm';

export default StoreForm;
