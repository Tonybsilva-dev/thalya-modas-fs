'use client'

import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { TitlePage } from "@/components/ui/title-page"
import { ChevronDownIcon, ChevronRightIcon, StoreIcon } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { useSession } from "next-auth/react"
import { LocationSwitch } from "./my-store/components/switch-location.component"

export const SettingsInterface = () => {

  const { data: session } = useSession()


  return (
    <>
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Início</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Configurações</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <TitlePage title="Configurações" >
          <Link href={'/dashboard/settings/my-store'}>
            <Button className="flex gap-2">
              < StoreIcon className="h-5 w-5" />
              Minha loja
            </Button>
          </Link>
        </TitlePage>
        <main className="flex-1 py-8">
          <div className="container grid gap-8 px-4 md:px-6">
            <section>
              <h2 className="text-lg font-semibold mb-4">Conta</h2>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <h3 className="text-base font-medium">Email</h3>
                  <p className="text-muted-foreground">Altere o endereço de e-mail associado à sua conta.</p>
                  <div className="flex items-center justify-between">
                    <span>{session?.user.email}</span>
                    <Link
                      href="#"
                      className="inline-flex items-center gap-1.5 text-primary hover:underline"
                      prefetch={false}
                    >
                      Alterar
                      <ChevronRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-base font-medium">Senha</h3>
                  <p className="text-muted-foreground">Atualize a senha da sua conta.</p>
                  <div className="flex items-center justify-between">
                    <span>••••••••</span>
                    <Link
                      href="#"
                      className="inline-flex items-center gap-1.5 text-primary hover:underline"
                      prefetch={false}
                    >
                      Alterar
                      <ChevronRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-4">Notificações</h2>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <h3 className="text-base font-medium">Push Notifications</h3>
                  <p className="text-muted-foreground">Receba notificações sobre atualizações importantes e novos recursos.</p>
                  <div className="flex items-center justify-between">
                    <span>Desativado</span>
                    <Switch id="push-notifications" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-base font-medium">Notificações por e-mail</h3>
                  <p className="text-muted-foreground">Receba atualizações por e-mail sobre sua conta e o aplicativo.</p>
                  <div className="flex items-center justify-between">
                    <span>Desativado</span>
                    <Switch id="email-notifications" />
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-4">Appearance</h2>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <h3 className="text-base font-medium">Tema</h3>
                  <p className="text-muted-foreground">Escolha um tema claro ou escuro para o aplicativo.</p>
                  <div className="flex items-center justify-between">
                    <span>Claro</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <ChevronDownIcon className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Claro</DropdownMenuItem>
                        <DropdownMenuItem>Escuro</DropdownMenuItem>
                        <DropdownMenuItem>Sistema</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-base font-medium">Tamanho da fonte</h3>
                  <p className="text-muted-foreground">Ajuste o tamanho da fonte para melhor legibilidade.</p>
                  <div className="flex items-center justify-between">
                    <span>Médio</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <ChevronDownIcon className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Pequeno</DropdownMenuItem>
                        <DropdownMenuItem>Médio</DropdownMenuItem>
                        <DropdownMenuItem>Grande</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-4">Privacidade</h2>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <h3 className="text-base font-medium">Serviços de localização</h3>
                  <p className="text-muted-foreground">
                    Permita que o aplicativo acesse sua localização para recomendações personalizadas.
                  </p>
                  <div className="flex items-center justify-between">
                    <span>Desativado</span>
                    <LocationSwitch />
                    {/* <Switch id="location-services" /> */}
                  </div>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-base font-medium">Compartilhamento de dados</h3>
                  <p className="text-muted-foreground">Compartilhe dados de uso anônimos para ajudar a melhorar o aplicativo.</p>
                  <div className="flex items-center justify-between">
                    <span>Desativado</span>
                    <Switch id="data-sharing" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div >
    </>
  )
}