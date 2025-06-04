import { Button } from "@/components/buttons";
import { CustomInput } from "@/components/inputs";
import { useTheme } from "@/contexts/theme-context";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Check, CornerUpLeft, Moon, Sun } from "lucide-react-native";
import { Card } from "@/components/cards";
import { Avatar } from "@/components/avatar";

const gradientColors = [
  "rgba(255, 148, 26, 1.0)",
  "rgba(255, 148, 26, 1.0)",
  "rgba(255, 195, 128, 1.0)",
  "rgba(255, 196, 128, 0.46)",
  "transparent",
] as const;

type FormData = {
  cpf: string;
  password: string;
};

export default function Onboarding() {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [rememberCpf, setRememberCpf] = useState(false);
  const [step, setStep] = useState<"cpf" | "success">("cpf");
  const [loading, setLoading] = useState(false);

  const { toggleTheme, theme } = useTheme();
  const { currentLanguage, changeLanguage } = useChangeLanguage();

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

    setLoading(true);
    setTimeout(() => {
      setStep("success");
      setLoading(false);
    }, 1500);
  };

  const handleBack = async () => {
    await AsyncStorage.removeItem("savedCpf");
    reset();
    setStep("cpf");
  };

  const renderCpfStep = () => (
    <View className="flex-1 bg-light-background-primary dark:bg-dark-background-primary rounded-t-2xl p-8">
      <Text className="font-bold text-2xl text-black dark:text-white">
        Se você já é nosso cliente, digite abaixo seu CPF.
      </Text>

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
        <Text className="text-sm text-gray-700 dark:text-gray-300">Lembrar CPF</Text>
      </TouchableOpacity>

      <View className="flex-1 items-center justify-center">
        <Button title="Prosseguir" onPress={handleSubmit(onSubmit)} className="rounded-3xl" />
      </View>

      <View className="flex-1 max-h-24 flex-row items-center justify-between gap-8">
        <Button
          title={theme === "dark" ? "Dark" : "Light"}
          variant="ghost"
          onPress={toggleTheme}
          className="flex-1 bg-light-brand-primary/30 dark:bg-dark-brand-primary/50 rounded-3xl"
          leftIcon={
            theme === "dark" ? (
              <Moon size={18} fill={"#FFF"} color={"#FFF"} />
            ) : (
              <Sun size={18} color={"#000000"} fill={"#000000"} />
            )
          }
        />
        <Button
          title={currentLanguage === "pt" ? "Portugues" : "Ingles"}
          variant="ghost"
          onPress={() => changeLanguage(currentLanguage === "pt" ? "en" : "pt")}
          className="flex-1 bg-light-brand-primary/30 dark:bg-dark-brand-primary/50 rounded-3xl"
          leftIcon={currentLanguage === "pt" ? <Text>🇧🇷</Text> : <Text>🇺🇸</Text>}
        />
      </View>
    </View>
  );

  const renderSuccessStep = () => (
    <View className="flex-1 bg-light-background-primary dark:bg-dark-background-primary rounded-t-2xl p-8">
      <View className="flex-row items-center gap-4 mb-8">
        <Avatar size={75} name="Douglas Souza" />
        <View className="flex-1">
          <Text className="text-xl font-extrabold text-gray-800 dark:text-white">Olá,</Text>
          <Text numberOfLines={1} className="text-2xl font-bold dark:text-white">
            Douglas de Souza Domiciano
          </Text>
          <Text className="text-lg text-gray-600 dark:text-gray-400">116.***.***-35</Text>
        </View>
        <TouchableOpacity onPress={handleBack} className="p-2">
          <CornerUpLeft size={32} />
        </TouchableOpacity>
      </View>

      <Text className="font-bold text-xl text-black dark:text-white">Informe sua senha.</Text>

      <View className="mt-8">
        <CustomInput
          name="password"
          label="Senha"
          control={control}
          type="password"
          variant="flat"
          placeholder="Digite aqui sua senha"
          error={errors.password?.message}
        />
      </View>

      <View className="flex-1 items-center justify-center">
        <Button title="Prosseguir" onPress={handleSubmit(onSubmit)} className="rounded-3xl" />
      </View>

      <View className="flex-1 max-h-24 flex-row items-center justify-between gap-8">
        <Button
          title={theme === "dark" ? "Dark" : "Light"}
          variant="ghost"
          onPress={toggleTheme}
          className="flex-1 bg-light-brand-primary/30 dark:bg-dark-brand-primary/50 rounded-3xl"
          leftIcon={
            theme === "dark" ? (
              <Moon size={18} fill={"#FFF"} color={"#FFF"} />
            ) : (
              <Sun size={18} color={"#000000"} fill={"#000000"} />
            )
          }
        />
        <Button
          title={currentLanguage === "pt" ? "Portugues" : "Ingles"}
          variant="ghost"
          onPress={() => changeLanguage(currentLanguage === "pt" ? "en" : "pt")}
          className="flex-1 bg-light-brand-primary/30 dark:bg-dark-brand-primary/50 rounded-3xl"
          leftIcon={currentLanguage === "pt" ? <Text>🇧🇷</Text> : <Text>🇺🇸</Text>}
        />
      </View>
    </View>
  );

  return (
    <LinearGradient className="flex-1" colors={gradientColors}>
      <View className="items-center justify-center mt-20 gap-2 py-2">
        <Text className="font-bold text-white text-4xl">PayFlow</Text>
        <Text className="font-medium text-white">version: 0.0.1</Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center bg-light-background-primary dark:bg-dark-background-primary rounded-t-2xl p-8">
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : step === "cpf" ? (
        renderCpfStep()
      ) : (
        renderSuccessStep()
      )}
    </LinearGradient>
  );
}
