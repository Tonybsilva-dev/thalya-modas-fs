"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import Link from "next/link"
import { z } from "zod";
import { createUser } from "../actions/register.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatDate } from "@/shared/helpers/format-date";
import ErrorMessage from "@/components/ui/error-message";

const signUpSchema = z.object({
  name: z.string({ required_error: "Campo obrigatório" }).min(1, { message: "Campo obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

type SignUpFormData = z.infer<typeof signUpSchema>;


export const SignUnPageInterface = () => {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      await createUser({
        email: data.email,
        password: data.password
      });

      toast.success("Usuário criado com sucesso.", {
        description: formatDate(new Date),
        action: {
          label: 'Acessar',
          onClick: () => router.push("/")
        },
      })

      router.push("/")
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');

        toast.warning(formattedErrors);
      } else {
        toast.error("Ocorreu um erro inesperado.", {
          description: formatDate(new Date),
        });
      }
    }
  };

  const words = [
    {
      text: "Cadastre-se",
      className: "text-red-500 dark:text-red-500",
    },
  ];

  return (
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-[350px] space-y-6">
          <div className="space-y-2 text-center">
            <TypewriterEffect words={words} />
            <p className="text-muted-foreground">Para acessar a plataforma.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" type="text"
                {...register("name")}
                aria-invalid={errors.name ? "true" : "false"} />
              <ErrorMessage error={errors.name} />
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
            <Button type="submit" className="w-full">
              Cadastrar
            </Button>
          </div>
        </form>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
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