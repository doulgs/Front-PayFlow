import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TransactionDTO } from "@/dtos/transaction";
import { useCurrency } from "@/hooks/useCurrency";
import { clsx } from "clsx";
import { SlidersHorizontal, TrendingDown, TrendingUp } from "lucide-react-native";
import { DateTime } from "luxon";
import React, { useCallback } from "react";
import { SectionList, Text, View } from "react-native";

const Transactions: TransactionDTO[] = [
  {
    id: "1",
    tenantId: "tenant-01",
    userId: "user-01",
    userName: "Douglas",
    accountId: "account-01",
    accountName: "Salário",
    categoryId: "cat-01",
    categoryName: "Trabalho",
    type: "income",
    title: "Pagamento Freelancer",
    description: "Projeto de app mobile concluído",
    value: 3200.0,
    status: "paid",
    dueDate: "2025-06-15T10:00:00.000Z",
    paidAt: "2025-06-15T11:00:00.000Z",
    createdAt: "2025-06-14T08:00:00.000Z",
    updatedAt: "2025-06-15T11:00:00.000Z",
  },
  {
    id: "2",
    tenantId: "tenant-01",
    userId: "user-01",
    userName: "Douglas",
    accountId: "account-02",
    accountName: "Despesas",
    categoryId: "cat-02",
    categoryName: "Transporte",
    type: "expense",
    title: "Combustível",
    description: "Posto Shell - abastecimento",
    value: 210.75,
    status: "paid",
    dueDate: "2025-06-14T18:00:00.000Z",
    paidAt: "2025-06-14T18:15:00.000Z",
    createdAt: "2025-06-14T17:00:00.000Z",
    updatedAt: "2025-06-14T18:15:00.000Z",
  },
  {
    id: "3",
    tenantId: "tenant-01",
    userId: "user-01",
    userName: "Douglas",
    accountId: "account-02",
    accountName: "Despesas",
    categoryId: "cat-03",
    categoryName: "Alimentação",
    type: "expense",
    title: "Café da manhã",
    description: "Padaria Bela Massa",
    value: 18.5,
    status: "paid",
    dueDate: "2025-06-13T08:00:00.000Z",
    paidAt: "2025-06-13T08:05:00.000Z",
    createdAt: "2025-06-13T07:30:00.000Z",
    updatedAt: "2025-06-13T08:05:00.000Z",
  },
  {
    id: "4",
    tenantId: "tenant-01",
    userId: "user-01",
    userName: "Douglas",
    accountId: "account-01",
    accountName: "Salário",
    categoryId: "cat-01",
    categoryName: "Trabalho",
    type: "income",
    title: "Consultoria React",
    description: "Treinamento técnico para equipe externa",
    value: 1200.0,
    status: "paid",
    dueDate: "2025-06-12T14:00:00.000Z",
    paidAt: "2025-06-12T14:45:00.000Z",
    createdAt: "2025-06-11T10:00:00.000Z",
    updatedAt: "2025-06-12T14:45:00.000Z",
  },
  {
    id: "5",
    tenantId: "tenant-01",
    userId: "user-01",
    userName: "Douglas",
    accountId: "account-03",
    accountName: "Despesas",
    categoryId: "cat-04",
    categoryName: "Saúde",
    type: "expense",
    title: "Consulta médica",
    description: "Clínica Vida - Dr. Rodrigo",
    value: 350.0,
    status: "paid",
    dueDate: "2025-06-10T15:00:00.000Z",
    paidAt: "2025-06-10T15:30:00.000Z",
    createdAt: "2025-06-09T13:00:00.000Z",
    updatedAt: "2025-06-10T15:30:00.000Z",
  },
  {
    id: "6",
    tenantId: "tenant-01",
    userId: "user-01",
    userName: "Douglas",
    accountId: "account-04",
    accountName: "Despesas",
    categoryId: "cat-05",
    categoryName: "Lazer",
    type: "expense",
    title: "Cinema com amigos",
    description: "Shopping Palladium - ingresso + pipoca",
    value: 62.9,
    status: "paid",
    dueDate: "2025-06-08T20:00:00.000Z",
    paidAt: "2025-06-08T20:20:00.000Z",
    createdAt: "2025-06-08T18:00:00.000Z",
    updatedAt: "2025-06-08T20:20:00.000Z",
  },
  {
    id: "7",
    tenantId: "tenant-01",
    userId: "user-01",
    userName: "Douglas",
    accountId: "account-01",
    accountName: "Salário",
    categoryId: "cat-06",
    categoryName: "Prêmios",
    type: "income",
    title: "Bônus por meta",
    description: "Meta de vendas batida em Junho",
    value: 800.0,
    status: "pending",
    dueDate: "2025-05-30T08:00:00.000Z",
    paidAt: null,
    createdAt: "2025-05-01T09:00:00.000Z",
    updatedAt: "2025-05-01T09:00:00.000Z",
  },
  {
    id: "8",
    tenantId: "tenant-01",
    userId: "user-01",
    userName: "Douglas",
    accountId: "account-02",
    accountName: "Despesas",
    categoryId: "cat-07",
    categoryName: "Assinaturas",
    type: "expense",
    title: "Netflix",
    description: "Plano mensal premium",
    value: 39.9,
    status: "paid",
    dueDate: "2025-06-05T00:00:00.000Z",
    paidAt: "2025-06-05T01:00:00.000Z",
    createdAt: "2025-06-04T22:00:00.000Z",
    updatedAt: "2025-06-05T01:00:00.000Z",
  },
  {
    id: "9",
    tenantId: "tenant-01",
    userId: "user-01",
    userName: "Douglas",
    accountId: "account-01",
    accountName: "Salário",
    categoryId: "cat-01",
    categoryName: "Trabalho",
    type: "income",
    title: "Reembolso viagens",
    description: "Despesas com viagem de trabalho",
    value: 450.0,
    status: "paid",
    dueDate: "2025-06-04T12:00:00.000Z",
    paidAt: "2025-06-04T12:30:00.000Z",
    createdAt: "2025-06-02T10:00:00.000Z",
    updatedAt: "2025-06-04T12:30:00.000Z",
  },
  {
    id: "10",
    tenantId: "tenant-01",
    userId: "user-01",
    userName: "Douglas",
    accountId: "account-03",
    accountName: "Despesas",
    categoryId: "cat-08",
    categoryName: "Casa",
    type: "expense",
    title: "Compra mercado",
    description: "Mercado Central - compras do mês",
    value: 680.75,
    status: "paid",
    dueDate: "2025-06-03T17:00:00.000Z",
    paidAt: "2025-06-03T17:15:00.000Z",
    createdAt: "2025-06-02T16:00:00.000Z",
    updatedAt: "2025-06-03T17:15:00.000Z",
  },
];

const extraTransaction: TransactionDTO = {
  id: "extra-transaction-id",
  tenantId: "system",
  userId: "system",
  userName: "",
  accountId: "system",
  accountName: "",
  categoryId: "system",
  categoryName: "",
  type: "income",
  title: "Conta aberta com sucesso",
  description:
    "Realize seu primeiro lançamento agora e começe agora mesmo a organizar suas finanças de forma rapida e pratica",
  value: 0,
  status: "paid",
  dueDate: DateTime.now().toISO(),
  paidAt: DateTime.now().toISO(),
  createdAt: DateTime.now().toISO(),
  updatedAt: DateTime.now().toISO(),
};

interface SectionData {
  title: string;
  data: TransactionDTO[];
}

const groupTransactionsByDate = (transactions: TransactionDTO[]): SectionData[] => {
  const grouped = transactions.reduce<Record<string, TransactionDTO[]>>((accumulator, transaction) => {
    const dateKey = DateTime.fromISO(transaction.dueDate).setZone("local").toFormat("dd/MM/yyyy");
    if (!accumulator[dateKey]) accumulator[dateKey] = [];
    accumulator[dateKey].push(transaction);
    return accumulator;
  }, {});

  return Object.entries(grouped)
    .sort(
      ([dateA], [dateB]) =>
        DateTime.fromFormat(dateB, "dd/MM/yyyy").toMillis() - DateTime.fromFormat(dateA, "dd/MM/yyyy").toMillis()
    )
    .map(([title, data]) => ({ title, data }));
};

const sections: SectionData[] = groupTransactionsByDate([...Transactions, extraTransaction]);

export const Activities = () => {
  const { formatCurrency } = useCurrency();

  const renderSectionHeader = useCallback(({ section }: { section: SectionData }) => {
    const date = DateTime.fromFormat(section.title, "dd/MM/yyyy").setZone("local").startOf("day");
    const today = DateTime.now().setZone("local").startOf("day");
    const yesterday = today.minus({ days: 1 });

    let displayText = date.setLocale("pt-BR").toFormat("dd/LLL").toUpperCase();

    if (date.hasSame(today, "day")) {
      displayText = "HOJE";
    } else if (date.hasSame(yesterday, "day")) {
      displayText = "ONTEM";
    }

    return <Text className="text-lg font-bold mt-3 mb-2 text-zinc-600 dark:text-zinc-300">{displayText}</Text>;
  }, []);

  const renderItem = useCallback(({ item }: { item: TransactionDTO }) => {
    return (
      <View className="mb-3 gap-4 flex-row rounded">
        <Avatar
          fallback={item.description}
          showBorder={false}
          icon={
            item.type == "income" ? <TrendingUp size={18} color={"#FFF"} /> : <TrendingDown size={18} color={"#FFF"} />
          }
          size={35}
          className="mt-1"
        />

        <View className="flex-1">
          <Text
            className={clsx("text-lg font-semibold", {
              "text-gray-500 line-through": item.status === "paid",
            })}
          >
            {item.title}
          </Text>
          <Text
            className={clsx("ext-sm mb-2", {
              "text-gray-400 line-through": item.status === "paid",
            })}
          >
            {item.description}
          </Text>
          <View className="flex-row gap-2">
            {item.userId !== "system" && (
              <Badge variant="outline" label={item.status == "paid" ? "Faturado" : "Pendente"} />
            )}

            {item.accountId && item.accountName && <Badge variant="outline" label={item.accountName} />}
            {item.categoryId && item.categoryName && <Badge variant="outline" label={item.categoryName} />}
          </View>
        </View>

        {item.value !== 0 && (
          <View>
            <Text
              className={clsx("text-lg font-semibold", {
                "text-status-success/90": item.type === "income",
                "text-status-danger/70": item.type === "expense",
                "line-through": item.status === "paid",
              })}
            >
              {item.type === "income" ? "+" : "-"}
              {formatCurrency(item.value ?? 0)}
            </Text>
          </View>
        )}

        {/* <Text className="text-sm font-semibold text-black dark:text-white">{item.title}</Text>
        <Text className="text-zinc-600 dark:text-zinc-300">{item.description}</Text>
        <Text className="text-zinc-900 dark:text-zinc-100">
          {item.type === "income" ? "+" : "-"} R$ {item.value.toFixed(2)}
        </Text> */}
      </View>
    );
  }, []);

  return (
    <View className="flex-1 bg-white px-6 pt-4">
      <View className="flex-row items-center justify-between my-4">
        <Text className="font-semibold text-xl">Movimentações</Text>
        <SlidersHorizontal size={18} />
      </View>

      <SectionList
        sections={sections}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
};
