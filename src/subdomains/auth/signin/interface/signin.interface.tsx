import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import Link from "next/link"


export const SignInPageInterface = () => {

  const words = [
    {
      text: "Acessar",
      className: "text-red-500 dark:text-red-500",
    },
  ];

  return (
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto w-[350px] space-y-6">
          <div className="space-y-2 text-center">
            <TypewriterEffect words={words} />
            <p className="text-muted-foreground">Entre com sua conta para acessar a plataforma.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline" prefetch={false}>
                  Esqueceu sua senha?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <Link href={"/signup"}>
              <Button type="button" className="w-full mt-4" variant={"ghost"}>
                Criar uma conta
              </Button>
            </Link>
          </div>
        </div>
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