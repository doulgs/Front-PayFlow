import React from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";

import { Button } from "@/components/ui/buttons";
import { CustomInput } from "@/components/ui/inputs";
import { MultiOptionsButton } from "@/components/ui/multi-options-button";
import { useToast } from "@/contexts/toast-context";
import { TransactionInputDTO } from "@/dtos/transaction";
import { useCurrency } from "@/hooks/useCurrency";
import { useCustomNavigation } from "@/hooks/useCustomNavigation";
import { useTheme } from "@/hooks/useTheme";
import { transactionService } from "@/services/transactions-service";
import { useTransactionStore } from "@/storages/useFinanceTransactionStore";
import { useUserStore } from "@/storages/useUserStore";
import { AlignLeft, CalendarDays, DollarSign, FileDigit, LetterText } from "lucide-react-native";
import { DateTime } from "luxon";
import { Controller, useForm } from "react-hook-form";

const Details = () => {
  const { palette } = useTheme();
  const { showToast } = useToast();
  const { iconColor } = useTheme();
  const { userId } = useUserStore();
  const { data } = useTransactionStore();
  const { formatCurrency } = useCurrency();
  const { router } = useCustomNavigation();

  const [isLoading, setIsLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TransactionInputDTO>({
    defaultValues: {
      type: data.type,
      status: "pending",
      code: "",
      title: "",
      description: "",
      notes: "",
      value: formatCurrency(data.value || 0),
      due_date: new Date().toISOString().substring(0, 10),
    },
  });

  React.useEffect(() => {
    if (data.value !== undefined) {
      setValue("value", formatCurrency(data.value));
    }
  }, [data.value]);

  const onSubmit = async (formData: TransactionInputDTO) => {
    const numericValue = Number(
      String(formData.value)
        .replace(/[^0-9,-]+/g, "")
        .replace(",", ".")
    );

    if (!userId) {
      console.error("Usuário não encontrado!");
      return;
    }

    if (!data.type) {
      console.error("Tipo da transação não definido!");
      return;
    }

    if (isNaN(numericValue)) {
      console.error("Valor inválido:", formData.value);
      return;
    }

    try {
      setIsLoading(true);

      const now = DateTime.now().setZone("America/Sao_Paulo");

      const dateWithCurrentTime = DateTime.fromISO(formData.due_date, {
        zone: "America/Sao_Paulo",
      })
        .set({
          hour: now.hour,
          minute: now.minute,
          second: now.second,
          millisecond: now.millisecond,
        })
        .toISO();

      const result = await transactionService.newTransaction(
        {
          ...formData,
          value: numericValue as unknown as string,
          type: data.type,
          due_date: dateWithCurrentTime || "",
        },
        userId
      );

      if (!result.isValid) {
        showToast({
          type: "warning",
          text: "Erro ao criar transação",
          description: `Erro. ${result.msg}`,
          position: "bottom",
        });
        setIsLoading(false);
        return;
      }

      reset();
      showToast({
        type: "success",
        text: "Transação criada",
        description: "A transação foi criada com sucesso.",
        position: "bottom",
      });
      router.replace("/(app)/(tabs)/(dashboard)");
    } catch (error) {
      showToast({
        type: "warning",
        text: "Erro ao criar transação",
        description: `Ocorreu um erro ao criar a transação. ${error}`,
        position: "bottom",
      });
      console.error("Error creating transaction:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-light-background-primary dark:bg-dark-background-primary rounded-t-2xl p-8">
        <ActivityIndicator size="large" color={palette.brand.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-light-background-secondary dark:bg-dark-background-alternative"
    >
      <ScrollView className="p-4">
        <View className="mb-4">
          <Text className="text-light-typography-secondary dark:text-dark-typography-secondary font-bold mb-1">
            Tipo de Transação
          </Text>
          <Controller
            name="type"
            control={control}
            render={({ field: { value, onChange } }) => (
              <MultiOptionsButton
                options={[
                  { label: "Entrada", value: "income" },
                  { label: "Saída", value: "expense" },
                  { label: "Outros", value: "other" },
                ]}
                selected={value}
                onChange={onChange}
              />
            )}
          />
        </View>

        <View className="mb-4">
          <Text className="text-light-typography-secondary dark:text-dark-typography-secondary font-bold mb-1">
            Tipo de Transação
          </Text>
          <Controller
            name="status"
            control={control}
            render={({ field: { value, onChange } }) => (
              <MultiOptionsButton
                options={[
                  { label: "Pendente", value: "pending" },
                  { label: "Finalizado", value: "completed" },
                ]}
                selected={value}
                onChange={onChange}
              />
            )}
          />
        </View>

        <CustomInput
          name="title"
          label="Título"
          control={control}
          type="text"
          placeholder="Digite um título"
          leftIcon={<LetterText size={18} color={iconColor} />}
          error={errors.title?.message}
        />
        <CustomInput
          name="description"
          label="Descrição"
          control={control}
          type="text"
          placeholder="Digite uma descrição"
          leftIcon={<AlignLeft size={18} color={iconColor} />}
          error={errors.description?.message}
        />

        <CustomInput
          name="due_date"
          label="Data"
          control={control}
          type="date"
          placeholder="Informe a data"
          leftIcon={<CalendarDays size={18} color={iconColor} />}
          error={errors.due_date?.message}
        />
        <CustomInput
          name="value"
          control={control}
          label="Valor da Transação"
          type="currency"
          placeholder="Digite o valor"
          leftIcon={<DollarSign size={18} color={iconColor} />}
        />
        <CustomInput
          name="code"
          label="Código do documento"
          control={control}
          type="number"
          placeholder="Digite o código do documento"
          leftIcon={<FileDigit size={18} color={iconColor} />}
          error={errors.code?.message}
        />
      </ScrollView>

      <View className="flex-1 flex-row max-h-20 border-t border-neutral-300 dark:border-neutral-800">
        <Button
          title="Cancelar"
          variant="ghost"
          textVariant="danger"
          className="flex-1"
          onPress={() => router.back()}
          disabled={isLoading}
        />
        <View className="w-[1.5px] bg-neutral-300 dark:bg-neutral-800" />
        <Button
          title="Cadastrar"
          variant="ghost"
          className="flex-1"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Details;
