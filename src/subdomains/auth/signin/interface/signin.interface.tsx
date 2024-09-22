"use client"

import { Button } from "@/components/ui/button"
import ErrorMessage from "@/components/ui/error-message"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { formatDate } from "@/shared/helpers/format-date"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession, signIn } from "next-auth/react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { signInSchema } from "@/lib/zod"
import { SignInGoogleButton } from "../components/signin-google-button"
import Image from "next/image"
import { useRouter } from 'next/navigation';

type signInFormData = z.infer<typeof signInSchema>

export const SignInPageInterface = () => {

  const router = useRouter()
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: signInFormData) => {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false
      })

      if (res?.error) {
        // Handle errors returned from signIn
        toast.error(res.error, {
          description: formatDate(new Date()),
        })
      } else {
        // Redirect or show success message
        router.push('/dashboard');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join(", ")

        toast.warning(`Erros de validação: ${formattedErrors}`)
      } else if (error instanceof Error) {
        toast.error(error.message, {
          description: formatDate(new Date()),
        })
      } else {
        toast.error("Ocorreu um erro inesperado.", {
          description: formatDate(new Date()),
        })
      }
    }
  }

  const words = [
    {
      text: "Acessar",
      className: "text-red-500 dark:text-red-500",
    },
  ]

  return (
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-[350px] space-y-6"
        >
          <div className="space-y-2 text-center">
            <TypewriterEffect words={words} />
            <p className="text-muted-foreground">
              Entre com sua conta para acessar a plataforma.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register("email")}
                type="email"
                placeholder="m@example.com"
              />
              <ErrorMessage error={errors.email} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                  prefetch={false}
                >
                  Esqueceu sua senha?
                </Link>
              </div>
              <Input
                id="password"
                {...register("password")}
                type="password"
              />
              <ErrorMessage error={errors.password} />
            </div>
            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              Entrar
            </Button>
            <Link href={"/signup"}>
              <Button type="button" className="w-full mt-4" variant={"ghost"}>
                Criar uma conta
              </Button>
            </Link>
          </div>
          <SignInGoogleButton />
        </form>
      </div>
      <div className="hidden bg-muted lg:block">
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
