'use client'

import { Button } from "./button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from 'next/navigation';

interface TitlePageProps {
  title: string;
  children?: React.ReactNode
}

export const TitlePage = ({ title, children }: TitlePageProps) => {

  const router = useRouter()

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="flex top-0 z-10 bg-background border-y">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ChevronLeftIcon className="w-5 h-5" />
          </Button>
          <h1 className="ml-4 text-2xl font-bold">{title}</h1>
        </div>
        {children}
      </div>
    </header>
  )
}