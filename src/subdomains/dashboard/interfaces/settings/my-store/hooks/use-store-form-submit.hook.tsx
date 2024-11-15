import { useState } from 'react';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils/format-date';
import { z } from 'zod';
import { StoreFormInputData } from '../validations/store-form-input-schema.validation';

interface FormSubmitResult {
  isSubmitting: boolean;
  onSubmit: (data: StoreFormInputData) => Promise<void>;
}

export function useStoreFormSubmit(): FormSubmitResult {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: StoreFormInputData) => {
    setIsSubmitting(true);
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
            .map((e: any) => `${e.path.join('.')}: ${e.message}`)
            .join(', ');
          toast.warning(`Erros de validação: ${formattedErrors}`);
        } else {
          toast.error(errorData.message);
          throw new Error(errorData.message || 'Erro desconhecido');
        }
        return;
      }

      await response.json();
      toast.success('Dados atualizados com sucesso.', {
        description: formatDate(new Date()),
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors
          .map((e) => `${e.path.join('.')}: ${e.message}`)
          .join(', ');

        toast.warning(`Erros de validação: ${formattedErrors}`);
      } else if (error instanceof Error) {
        toast.error(error.message, {
          description: formatDate(new Date()),
        });
      } else {
        toast.error('Ocorreu um erro inesperado.', {
          description: formatDate(new Date()),
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, onSubmit };
}
