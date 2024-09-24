'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { StoreFormData, storeSchema } from '../validations/get-store-info.validation';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { formatDate } from '@/shared/helpers/format-date';
import { z } from 'zod';
import ErrorMessage from '@/components/ui/error-message';
import { useSession } from 'next-auth/react';

interface StoreFormProps {
  initialData: StoreFormData | null;
}

const StoreForm: React.FC<StoreFormProps> = ({ initialData }) => {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
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

  useEffect(() => {
    reset(initialData || {
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
  }, [initialData, reset, session?.user.id]);

  const onSubmit = async (data: StoreFormData) => {
    try {
      await fetch('/api/store/upsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      toast.success("Dados atualizados com sucesso.", {
        description: formatDate(new Date()),
      });
    } catch (error: any) {
      // Tratamento de erro do Zod
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join(", ");

        toast.warning(`Erros de validação: ${formattedErrors}`);
      }
      // Tratamento de erro de e-mail duplicado ou outros erros
      else if (error instanceof Error) {
        toast.error(error.message, {
          description: formatDate(new Date()),
        });
      }
      // Tratamento de outros tipos de erro
      else {
        toast.error("Ocorreu um erro inesperado.", {
          description: formatDate(new Date()),
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="container grid grid-cols-1 gap-4 md:grid-cols-1 space-y-2">
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
          <label className="block text-sm font-medium">Apartamento/Suite</label>
          <Input
            {...register('suite')}
            type="text"
            placeholder="Apartamento/Suite"
          />
          <ErrorMessage error={errors.suite} />
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
          <label className="block text-sm font-medium">CEP</label>
          <Input
            {...register('zipcode')}
            type="text"
            placeholder="CEP"
          />
          <ErrorMessage error={errors.zipcode} />
        </div>
        <div className='space-y-2'>
          <label className="block text-sm font-medium">Latitude</label>
          <Input
            {...register('lat', { valueAsNumber: true })}
            type="number"
            step="any"
            placeholder="Latitude"
          />
          <ErrorMessage error={errors.lat} />
        </div>
        <div className='space-y-2'>
          <label className="block text-sm font-medium">Longitude</label>
          <Input
            {...register('lng', { valueAsNumber: true })}
            type="number"
            step="any"
            placeholder="Longitude"
          />
          <ErrorMessage error={errors.lng} />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Atualizando...' : 'Salvar alterações'}
        </Button>
      </div>
    </form>
  );
};

export default StoreForm;
