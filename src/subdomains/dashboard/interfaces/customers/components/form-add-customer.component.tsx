"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import InputMask from 'react-input-mask';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PlusIcon } from "lucide-react";
import { useMediaQuery } from "@/shared/hooks/use-media-query.hook";
import { createCustomer } from "../actions/add-new-customer";
import { Prisma } from "@prisma/client";
import { addCustomerZodSchema, CustomerFormData } from "../validations/add-customer.validation";
import ErrorMessage from "@/components/ui/error-message";

interface AddCustomerModalProps {
  onCustomerAdded: (customer: Prisma.CustomerGetPayload<{}>) => void;
  storeId: string;
}

export default function AddCustomerModal({
  onCustomerAdded,
  storeId,
}: AddCustomerModalProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { reset, formState, register, handleSubmit } = useForm<CustomerFormData>({
    resolver: zodResolver(addCustomerZodSchema),
    mode: 'onChange',
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: CustomerFormData) {
    try {
      const newCustomer = await createCustomer({
        ...values,
        storeId,
      });
      onCustomerAdded(newCustomer);
      toast.success(`${values.name} cadastrado.`);
      reset();
      setOpen(false);
    } catch (error: any) {
      toast.error(`Failed to add customer: ${error.message}`);
    }
  }

  const FormContent = (
    <form id="customer-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="name" className="text-left">
            Nome completo
          </Label>
          <Input
            id="name"
            className="col-span-3"
            {...register("name")}
          />
          {formState.errors.name && (
            <ErrorMessage error={formState.errors.name} />
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="email" className="text-left">
            Email
          </Label>
          <Input
            id="email"
            className="col-span-3"
            {...register("email")}
          />
          {formState.errors.email && (
            <ErrorMessage error={formState.errors.email} />
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="phone" className="text-left">
            Telefone
          </Label>
          {/* <InputMask
            mask="(99) 99999-9999" 
            {...register('phone')}
          >
            {(inputProps) => (
              <Input
                id="phone"
                className="col-span-3"
                {...inputProps} 
                type="tel"
              />
            )}
          </InputMask> */}
          <Input
            id="phone"
            className="col-span-3"
            {...register("phone")}
          />
          {formState.errors.phone && (
            <ErrorMessage error={formState.errors.phone} />
          )}
        </div>
      </div>
    </form>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" size="icon">
            <PlusIcon className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar cliente</DialogTitle>
            <DialogDescription>
              Preencha os dados do novo cliente. Clique em salvar quando terminar.
            </DialogDescription>
          </DialogHeader>
          {FormContent}
          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={() => setOpen(false)} className="mr-2">
              Cancelar
            </Button>
            <Button type="submit" form="customer-form">
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="default" size="icon">
            <PlusIcon className="w-4 h-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Adicionar cliente</DrawerTitle>
            <DrawerDescription>
              Preencha os dados do novo cliente. Clique em salvar quando terminar.
            </DrawerDescription>
          </DrawerHeader>
          <div className="container">
            {FormContent}
          </div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
            <Button type="submit" form="customer-form">
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
}
