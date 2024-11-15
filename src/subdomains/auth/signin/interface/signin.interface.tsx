"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { formatDate } from "@/lib/utils/format-date"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { SignInGoogleButton } from "../components/signin-google-button"
import Image from "next/image"
import { useRouter } from 'next/navigation';
import { AppError } from "@/lib/error"
import { useIsMobile } from "@/hooks/use-mobile"
import { Separator } from "@/components/ui/separator"
import { SignIn, signInZodSchema } from "@/server/(public)/auth/sign-in/validations/sign-in.validation"

type signInFormData = SignIn

export const SignInPageInterface = () => {

  const router = useRouter()
  const isMobile = useIsMobile()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signInFormData>({
    mode: 'onChange',
    resolver: zodResolver(signInZodSchema),
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
      const appError = AppError.from(error);
      appError.logError();

      toast.error(appError.message, {
        description: formatDate(new Date()),
      });
    }
  }

  const WORDS = [
    {
      text: "Acessar",
      className: "text-red-500 dark:text-red-500",
    },
  ]

  return (
    <div className="w-full h-screen flex items-center justify-center lg:grid lg:h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-[350px] space-y-6"
        >
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
                <Label className=" text-[48px] font-semibold text-red-500">Acessar</Label>
              </>
            ) : (
              <TypewriterEffect words={WORDS} />
            )}
            <p className="text-muted-foreground">
              Entre com sua conta para acessar a plataforma.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                {...register("email")}
                label="Email"
                errorMessage={errors.email}
                type="email"
                placeholder="m@example.com"
              />
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
                errorMessage={errors.password}
              />
            </div>
            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              Entrar
            </Button>
          </div>
          <Separator />
          <SignInGoogleButton />
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
