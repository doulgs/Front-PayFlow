import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/buttons";
import { CustomInput } from "@/components/ui/inputs";
import { useAuth } from "@/contexts/auth-provaider";
import { useTheme as useThemeContext } from "@/contexts/theme-context";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { useCustomNavigation } from "@/hooks/useCustomNavigation";
import { useTheme } from "@/hooks/useTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Check, CornerUpLeft, Moon, Sun } from "lucide-react-native";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export default function Index() {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const { t } = useChangeLanguage();
  const { router, to } = useCustomNavigation();
  const { iconColor, palette } = useTheme();
  const { toggleTheme, theme } = useThemeContext();
  const { currentLanguage, changeLanguage } = useChangeLanguage();
  const { signIn, loading: loadinAuth } = useAuth();
  const [rememberEmail, setRememberEmail] = useState(false);
  const [step, setStep] = useState<"email" | "success">("email");
  const [loading, setLoading] = useState(false);
  const [savedEmailValue, setSavedEmailValue] = useState<string>("");

  useEffect(() => {
    AsyncStorage.getItem("savedEmail").then((email) => {
      if (email) {
        setValue("email", email);
        setRememberEmail(true);
        setSavedEmailValue(email);
      }
    });
  }, []);

  const handleEmailSubmit: SubmitHandler<FormData> = async (data) => {
    if (rememberEmail) {
      await AsyncStorage.setItem("savedEmail", data.email);
    } else {
      await AsyncStorage.removeItem("savedEmail");
    }

    setLoading(true);
    setTimeout(() => {
      setStep("success");
      setLoading(false);
      setSavedEmailValue(data.email);
    }, 1500);
  };

  const handleLoginSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const result = await signIn(data.email, data.password);
      if (result.success) {
        router.replace("/(app)/(tabs)/(dashboard)");
      } else {
        console.log(result.error.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleBack = async () => {
    await AsyncStorage.removeItem("savedEmail");
    reset();
    setStep("email");
  };

  const handleNavigetionRegister = async () => {
    to.auth.register();
  };

  const renderEmailStep = () => (
    <View className="flex-1 bg-light-background-secondary dark:bg-dark-background-alternative rounded-t-2xl p-8">
      <Text className="font-bold text-2xl text-black dark:text-white">{t("onboarding.email.title")}</Text>

      <View className="mt-8">
        <CustomInput
          name="email"
          label={t("onboarding.email.label")}
          control={control}
          type="mail"
          variant="flat"
          placeholder={t("onboarding.email.placeholder")}
          error={errors.email?.message}
        />
      </View>

      <TouchableOpacity className="flex-row items-center gap-2 mt-20" onPress={() => setRememberEmail((prev) => !prev)}>
        <View className="w-5 h-5 rounded border border-gray-400 items-center justify-center">
          {rememberEmail && <Check size={16} color="#000" />}
        </View>
        <Text className="text-sm text-gray-700 dark:text-gray-300">{t("onboarding.email.remember")}</Text>
      </TouchableOpacity>

      <View className="flex-1 items-center justify-center">
        <Button
          title={t("onboarding.email.button")}
          onPress={handleSubmit(handleEmailSubmit)}
          className="rounded-3xl"
        />
        <Button
          variant="ghost"
          title={t("onboarding.register.button")}
          onPress={handleSubmit(handleNavigetionRegister)}
          className="rounded-3xl"
        />
      </View>

      <View className="flex-1 max-h-24 flex-row items-center justify-between gap-8">
        <Button
          title={theme === "dark" ? t("onboarding.email.themeToggle.dark") : t("onboarding.email.themeToggle.light")}
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
            currentLanguage === "pt" ? t("onboarding.email.languageToggle.pt") : t("onboarding.email.languageToggle.en")
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
    <View className="flex-1 bg-light-background-secondary dark:bg-dark-background-alternative rounded-t-2xl p-8">
      <View className="flex-row items-center gap-4 mb-8">
        <Avatar size={75} name="Douglas Souza" />
        <View className="flex-1 bg-light-background-secondary dark:bg-dark-background-alternative">
          <Text className="text-xl font-extrabold text-gray-800 dark:text-white">
            {t("onboarding.success.greeting")}
          </Text>
          <Text numberOfLines={1} className="text-2xl font-bold dark:text-white">
            {t("onboarding.success.name")}
          </Text>
          <Text className="text-lg text-gray-600 dark:text-gray-400">{savedEmailValue}</Text>
        </View>
        <TouchableOpacity onPress={handleBack} className="p-2">
          <CornerUpLeft size={32} color={iconColor} />
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
          title={theme === "dark" ? t("onboarding.email.themeToggle.dark") : t("onboarding.email.themeToggle.light")}
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
            currentLanguage === "pt" ? t("onboarding.email.languageToggle.pt") : t("onboarding.email.languageToggle.en")
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
    <View className="flex-1 bg-light-brand-primary dark:bg-dark-brand-primary">
      <View className="items-center justify-center mt-20 gap-2 py-2">
        <Text className="font-bold text-white text-4xl">{t("onboarding.header.title")}</Text>
        <Text className="font-medium text-white">{t("onboarding.header.version")}</Text>
      </View>

      {loading || loadinAuth ? (
        <View className="flex-1 items-center justify-center bg-light-background-primary dark:bg-dark-background-primary rounded-t-2xl p-8">
          <ActivityIndicator size="large" color={palette.brand.primary} />
        </View>
      ) : step === "email" ? (
        renderEmailStep()
      ) : (
        renderSuccessStep()
      )}
    </View>
  );
}
