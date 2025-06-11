import { Button } from "@/components/ui/buttons";
import { NumericKeyboard } from "@/components/ui/keyboard";
import { MultiOptionsButton } from "@/components/ui/multi-options-button";
import { useToast } from "@/contexts/toast-context";
import { useCurrency } from "@/hooks/useCurrency";
import { useCustomNavigation } from "@/hooks/useCustomNavigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";

interface FormData {
  amount: string;
  type: "Entrada" | "Saida" | "Outros";
}

export default function Index() {
  const { to } = useCustomNavigation();
  const { showToast } = useToast();
  const { formatCurrency } = useCurrency();

  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      amount: "0",
      type: "Entrada",
    },
  });

  const raw = watch("amount");
  const val = parseInt(raw || "0", 10) / 100;
  const formatted = formatCurrency(val);

  const onSubmit = (data: FormData) => {
    if (data.amount === "0") {
      showToast({
        type: "danger",
        text: "Valor inválido",
        description: "Por favor, insira um valor maior que zero.",
        position: "bottom",
      });
      return;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-between bg-light-background-secondary dark:bg-dark-background-alternative p-4"
    >
      {/* Seletor de tipo */}
      <View>
        <Controller
          name="type"
          control={control}
          render={({ field: { value, onChange } }) => (
            <MultiOptionsButton options={["Entrada", "Saida"]} selected={value} onChange={onChange} />
          )}
        />
      </View>

      {/* Valor central */}
      <View className="flex-1 justify-center items-center mb-4">
        <Text className="text-xl font-semibold mb-6 text-light-typography-muted dark:text-dark-typography-muted">
          Digite o valor da transação
        </Text>
        <Text className="text-5xl font-bold text-light-typography-primary dark:text-dark-typography-primary">
          {formatted}
        </Text>
      </View>

      {/* Teclado numérico */}
      <NumericKeyboard control={control} name="amount" />

      {/* Botão */}
      <Button title="Confirmar" onPress={handleSubmit(onSubmit)} className="my-4 mx-2" />
    </KeyboardAvoidingView>
  );
}
