import { Button } from "@/components/buttons";
import { CustomInput } from "@/components/inputs";
import { useTheme } from "@/contexts/theme-context";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Check } from "lucide-react-native";

const gradientColors = [
  "rgba(255, 148, 26, 1.0)",
  "rgba(255, 148, 26, 1.0)",
  "rgba(255, 195, 128, 1.0)",
  "rgba(255, 196, 128, 0.46)",
  "transparent",
] as const;

type FormData = {
  cpf: string;
};

export default function OnboardingScreen() {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [rememberCpf, setRememberCpf] = useState(false);
  const { toggleTheme } = useTheme();
  const { t, changeLanguage } = useChangeLanguage();

  useEffect(() => {
    AsyncStorage.getItem("savedCpf").then((cpf) => {
      if (cpf) {
        setValue("cpf", cpf);
        setRememberCpf(true);
      }
    });
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (rememberCpf) {
      await AsyncStorage.setItem("savedCpf", data.cpf);
    } else {
      await AsyncStorage.removeItem("savedCpf");
    }

    console.log("CPF enviado:", data.cpf);
  };

  return (
    <LinearGradient className="flex-1" colors={gradientColors}>
      <View className="items-center justify-center mt-20 gap-2 py-2">
        <Text className="font-bold text-white text-4xl">PayFlow</Text>
        <Text className="font-medium text-white">version: 0.0.1</Text>
      </View>

      <View className="flex-1 bg-light-background-primary rounded-t-2xl p-8">
        <Text className="font-bold text-2xl">Se você já é nosso cliente, digite abaixo seu CPF.</Text>

        <View className="mt-8">
          <CustomInput
            name="cpf"
            label="CPF"
            control={control}
            type="cpf"
            variant="flat"
            placeholder="Digite aqui seu CPF"
            error={errors.cpf?.message}
          />
        </View>

        <TouchableOpacity className="flex-row items-center gap-2 mt-20" onPress={() => setRememberCpf((prev) => !prev)}>
          <View className="w-5 h-5 rounded border border-gray-400 items-center justify-center">
            {rememberCpf && <Check size={16} color="#000" />}
          </View>
          <Text className="text-sm text-gray-700">Lembrar CPF</Text>
        </TouchableOpacity>

        <View className="flex-1 items-center justify-end mt-8 gap-4">
          <Button title="Prosseguir" onPress={handleSubmit(onSubmit)} className="rounded-3xl mx-12" />
        </View>
      </View>
    </LinearGradient>
  );
}
