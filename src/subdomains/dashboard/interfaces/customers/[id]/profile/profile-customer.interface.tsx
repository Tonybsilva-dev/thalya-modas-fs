"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Edit, Mail, Phone, MapPin } from "lucide-react"

// Dados de exemplo do cliente
const clienteExemplo = {
  id: 1,
  nome: "João Silva",
  email: "joao@exemplo.com",
  telefone: "(11) 98765-4321",
  endereco: "Rua Exemplo, 123 - Cidade, Estado",
  cpfCnpj: "123.456.789-00",
  ultimosPagamentos: [
    { data: "2023-05-15", valor: 500.00 },
    { data: "2023-04-15", valor: 500.00 },
    { data: "2023-03-15", valor: 500.00 },
  ],
  promissoria: {
    numero: "001/2023",
    valor: 1500.00,
    dataEmissao: "2023-05-15",
    dataVencimento: "2023-08-15",
    localPagamento: "São Paulo - SP",
  }
}

export const ProfileCustomerInterface: React.FC = () => {
  const [cliente] = useState(clienteExemplo)

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Perfil do Cliente</CardTitle>
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder-avatar.jpg" alt={cliente.nome} />
              <AvatarFallback>{cliente.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{cliente.nome}</h2>
              <p className="text-muted-foreground">{cliente.cpfCnpj}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary">Cliente Ativo</Badge>
                <Badge variant="outline">Preferencial</Badge>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informações de Contato</h3>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{cliente.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{cliente.telefone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{cliente.endereco}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Últimos Pagamentos</h3>
              {cliente.ultimosPagamentos.map((pagamento, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(pagamento.data).toLocaleDateString()}</span>
                  </div>
                  <span className="font-medium">
                    R$ {pagamento.valor.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h3 className="text-lg font-semibold mb-4">Nota Promissória Atual</h3>
            <div className="bg-muted p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Número</p>
                  <p className="font-medium">{cliente.promissoria.numero}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor</p>
                  <p className="font-medium">R$ {cliente.promissoria.valor.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data de Emissão</p>
                  <p className="font-medium">{new Date(cliente.promissoria.dataEmissao).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data de Vencimento</p>
                  <p className="font-medium">{new Date(cliente.promissoria.dataVencimento).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Local de Pagamento</p>
                <p className="font-medium">{cliente.promissoria.localPagamento}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="outline">Histórico Completo</Button>
            <Button>Emitir Nova Promissória</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}