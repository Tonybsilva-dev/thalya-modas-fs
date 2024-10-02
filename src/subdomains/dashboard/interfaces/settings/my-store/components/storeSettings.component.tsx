// app/dashboard/settings/components/StoreSettings.tsx
'use client';

import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { TitlePage } from "@/components/ui/title-page";
import { SaveIcon } from "lucide-react";
import StoreForm, { StoreFormHandle } from './storeForm.component';
import { StoreFormData } from '../validations/get-store-info.validation';

interface StoreSettingsProps {
  initialData: StoreFormData | null;
}

const StoreSettings: React.FC<StoreSettingsProps> = ({ initialData }) => {
  const formRef = useRef<StoreFormHandle>(null);

  const handleSave = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    } else {
      console.log("formRef is not available.");
    }
  }

  return (
    <>
      <TitlePage title="Minha loja">
        <Button className="flex gap-2" onClick={handleSave}>
          <SaveIcon className="h-5 w-5" />
          Salvar alterações
        </Button>
      </TitlePage>

      <main className="flex-1 py-8">
        <div className="containergrid gap-8 px-4 md:px-6">
          <StoreForm ref={formRef} initialData={initialData} />
        </div>
      </main>
    </>
  )
}

export default StoreSettings;
