import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/buttons";
import { CustomInput } from "@/components/ui/inputs";
import { useTheme } from "@/contexts/theme-context";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { useCustomNavigation } from "@/hooks/useCustomNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Check, CornerUpLeft, Moon, Sun } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

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
  const { toggleTheme, theme } = useTheme();
  const { currentLanguage, changeLanguage } = useChangeLanguage();
  const { t } = useChangeLanguage();
  const { to } = useCustomNavigation();

  const [rememberCpf, setRememberCpf] = useState(false);
  const [step, setStep] = useState<"cpf" | "success">("cpf");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("savedCpf").then((cpf) => {
      if (cpf) {
        setValue("cpf", cpf);
        setRememberCpf(true);
      }
    });
  }, []);

  const handleCpfSubmit: SubmitHandler<FormData> = async (data) => {
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

  const handleLoginSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      to.app.tabs.dashboard.home();
      console.log("Login bem-sucedido com CPF:", data.cpf, "e senha:", data.password);
    } catch (err) {
      console.error("Erro no login", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = async () => {
    await AsyncStorage.removeItem("savedCpf");
    reset();
    setStep("cpf");
  };

  const renderCpfStep = () => (
    <View className="flex-1 bg-light-background-primary dark:bg-dark-background-primary rounded-t-2xl p-8">
      <Text className="font-bold text-2xl text-black dark:text-white">{t("onboarding.cpf.title")}</Text>

      <View className="mt-8">
        <CustomInput
          name="cpf"
          label={t("onboarding.cpf.label")}
          control={control}
          type="cpf"
          variant="flat"
          placeholder={t("onboarding.cpf.placeholder")}
          error={errors.cpf?.message}
        />
      </View>

      <TouchableOpacity className="flex-row items-center gap-2 mt-20" onPress={() => setRememberCpf((prev) => !prev)}>
        <View className="w-5 h-5 rounded border border-gray-400 items-center justify-center">
          {rememberCpf && <Check size={16} color="#000" />}
        </View>
        <Text className="text-sm text-gray-700 dark:text-gray-300">{t("onboarding.cpf.remember")}</Text>
      </TouchableOpacity>

      <View className="flex-1 items-center justify-center">
        <Button title={t("onboarding.cpf.button")} onPress={handleSubmit(handleCpfSubmit)} className="rounded-3xl" />
      </View>

      <View className="flex-1 max-h-24 flex-row items-center justify-between gap-8">
        <Button
          title={theme === "dark" ? t("onboarding.cpf.themeToggle.dark") : t("onboarding.cpf.themeToggle.light")}
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
          title={
            currentLanguage === "pt" ? t("onboarding.cpf.languageToggle.pt") : t("onboarding.cpf.languageToggle.en")
          }
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
          <Text className="text-xl font-extrabold text-gray-800 dark:text-white">
            {t("onboarding.success.greeting")}
          </Text>
          <Text numberOfLines={1} className="text-2xl font-bold dark:text-white">
            {t("onboarding.success.name")}
          </Text>
          <Text className="text-lg text-gray-600 dark:text-gray-400">{t("onboarding.success.cpfMasked")}</Text>
        </View>
        <TouchableOpacity onPress={handleBack} className="p-2">
          <CornerUpLeft size={32} />
        </TouchableOpacity>
      </View>

      <Text className="font-bold text-xl text-black dark:text-white">{t("onboarding.success.passwordTitle")}</Text>

      <View className="mt-8">
        <CustomInput
          name="password"
          label={t("onboarding.success.passwordLabel")}
          control={control}
          type="password"
          variant="flat"
          placeholder={t("onboarding.success.passwordPlaceholder")}
          error={errors.password?.message}
        />
      </View>

      <View className="flex-1 items-center justify-center">
        <Button
          title={t("onboarding.success.button")}
          onPress={handleSubmit(handleLoginSubmit)}
          className="rounded-3xl"
        />
      </View>

      <View className="flex-1 max-h-24 flex-row items-center justify-between gap-8">
        <Button
          title={theme === "dark" ? t("onboarding.cpf.themeToggle.dark") : t("onboarding.cpf.themeToggle.light")}
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
          title={
            currentLanguage === "pt" ? t("onboarding.cpf.languageToggle.pt") : t("onboarding.cpf.languageToggle.en")
          }
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
        <Text className="font-bold text-white text-4xl">{t("onboarding.header.title")}</Text>
        <Text className="font-medium text-white">{t("onboarding.header.version")}</Text>
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
