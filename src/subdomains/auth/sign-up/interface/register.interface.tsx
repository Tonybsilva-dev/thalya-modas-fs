"use client";

import Image from "next/image";
import Link from "next/link"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { toast } from "sonner";
import { formatDate } from "@/lib/utils/format-date";
import ErrorMessage from "@/components/ui/error-message";
import { signUpCredentails } from "@/server/(public)/auth/sign-up/action/sign-up.action";
import { SignUpCredentails, signUpCredentialsZodSchema } from "@/server/(public)/auth/sign-up/validations/sign-up.validation";
import { AppError } from "@/lib/error";
import { useIsMobile } from "@/hooks/use-mobile";

export type SignUpFormData = Pick<SignUpCredentails, 'name' | 'email' | 'password'>;
export const SignUnPageInterface = () => {
  const isMobile = useIsMobile()
  const WORDS = [
    {
      text: "Cadastre-se",
      className: "text-red-500 dark:text-red-500 text-2xl",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    mode: 'onChange',
    resolver: zodResolver(signUpCredentialsZodSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
    }
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await signUpCredentails(data)
      toast.success("Usuário criado com sucesso.", {
        description: formatDate(new Date),
      })
    } catch (error) {
      const appError = AppError.from(error);
      appError.logError();

      toast.error(appError.message, {
        description: formatDate(new Date()),
      });
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center lg:grid lg:h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center h-full">
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-[350px] space-y-6">
          <div className="space-y-2 text-center">
            {isMobile ? (
              <>
                <div className="mb-8">
                  <Image
                    src={"https://fakeimg.pl/600x150"}
                    className="mx-auto"
                    width={600}
                    height={150}
                    alt="placeholder"
                  />
                </div>
                <Label className=" text-[48px] font-semibold text-red-500">Cadastre-se</Label>
              </>
            ) : (
              <TypewriterEffect words={WORDS} />
            )}
            <p className="text-muted-foreground">Para acessar a plataforma.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                id="name"
                type="text"
                {...register("name")}
                label="Nome completo"
                errorMessage={errors.name}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"} />
              <ErrorMessage error={errors.email} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <Link href="/" className="ml-auto inline-block text-sm underline" prefetch={false}>
                  Já possuo uma conta!
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                {...register("password")}
                aria-invalid={errors.password ? "true" : "false"} />
              <ErrorMessage error={errors.password} />
            </div>
            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              Cadastrar
            </Button>
          </div>
        </form>
      </div>

      <div className="hidden h-full bg-muted lg:block">
        <Image
          src="/signin-background.webp"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
          style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
        />
      </div>
    </div>
  )
}