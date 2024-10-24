import { DollarSign, Users, BarChart, Clock } from "lucide-react";
import { CardData } from "../types/dashboard/card-status.type";

export const cardDataList: CardData[] = [
  {
    title: "Receita Total",
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    value: "R$45.231",
    description: "+20.1% em relação ao mês passado",
  },
  {
    title: "Novos Clientes",
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
    value: "+2350",
    description: "+180.1% em relação ao mês passado",
  },
  {
    title: "Vendas",
    icon: <BarChart className="h-4 w-4 text-muted-foreground" />,
    value: "+12,234",
    description: "+19% em relação ao mês passado",
  },
  {
    title: "Tempo Ativo",
    icon: <Clock className="h-4 w-4 text-muted-foreground" />,
    value: "99.9%",
    description: "+4% em relação ao mês passado",
  },
];