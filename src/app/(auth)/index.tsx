import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/buttons";
import { CustomInput } from "@/components/ui/inputs";
import { useAuth } from "@/contexts/auth-provaider";
import { useTheme as useThemeContext } from "@/contexts/theme-context";
import { useToast } from "@/contexts/toast-context";
import { UserLoginDTO } from "@/dtos/user";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { useCustomNavigation } from "@/hooks/useCustomNavigation";
import { useGreeting } from "@/hooks/useGreeting";
import { useMask } from "@/hooks/useMaskDocument";
import { useTheme } from "@/hooks/useTheme";
import { userService } from "@/services/user-service";
import { useUserStore } from "@/storages/useUserStore";
import { Check, Moon, Sun } from "lucide-react-native";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Index() {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<UserLoginDTO>({ mode: "onSubmit" });
  const { t } = useChangeLanguage();
  const { greeting } = useGreeting();
  const { router, to } = useCustomNavigation();
  const { palette } = useTheme();
  const { toggleTheme, theme } = useThemeContext();
  const { currentLanguage, changeLanguage } = useChangeLanguage();
  const { maskCpf } = useMask();
  const { showToast } = useToast();
  const { signIn, loading: loadinAuth } = useAuth();
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [step, setStep] = useState<"email" | "success">("email");
  const { userId, setUserId, user, setUser } = useUserStore();

  useEffect(() => {
    let isMounted = true;
    if (userId) {
      (async () => {
        setLoadingUser(true);
        const userData = await userService.getUser(userId);
        if (isMounted && userData.isValid && userData.data) {
          const userInfo = userData.data;
          setValue("email", userInfo.email);
          setStep("success");
          setUser(userInfo);
        }
        setLoadingUser(false);
      })();
    }
    return () => {
      isMounted = false;
    };
  }, [userId]);

  const handleEmailSubmit: SubmitHandler<UserLoginDTO> = async (data) => {
    if (!data.email || data.email.trim() === "") {
      showToast({
        type: "warning",
        text: "Email obrigatório",
        description: "Por favor, insira seu email.",
        position: "bottom",
      });
      return;
    }
    setLoadingUser(true);
    try {
      const userData = await userService.getUserByEmail(data.email);
      if (!userData.isValid || userData.data === null) {
        showToast({
          type: "warning",
          text: "Usuário não encontrado",
          description: "Ocorreu um erro ao verificar o email. Por favor, tente novamente.",
          position: "bottom",
        });
        reset();
        return;
      }

      const userInfo = userData.data;
      setValue("email", userInfo.email);
      setUserId(userInfo.id);
      setUser(userInfo);
      setStep("success");
    } catch (error) {
      console.error("Erro ao buscar usuário por email:", error);
      showToast({
        type: "warning",
        text: "Erro ao verificar email",
        description: "Ocorreu um erro ao verificar o email. Por favor, tente novamente.",
      });
    } finally {
      setLoadingUser(false);
    }
  };

  const handleLoginSubmit: SubmitHandler<UserLoginDTO> = async (data) => {
    if (!data.password || data.password.trim() === "") {
      showToast({
        type: "warning",
        text: "Senha obrigatória",
        description: "Por favor, insira sua senha.",
        position: "bottom",
      });
      return;
    }

    setLoadingUser(true);

    try {
      const { isValid, msg, data: result } = await signIn(data);

      if (keepLoggedIn && result) {
        setUserId(result.id);
      }

      if (isValid && result) {
        const userData = await userService.getUser(result.id);

        if (!userData.isValid || userData.data === null) {
          reset();
          setStep("email");
          return;
        }
        const userInfo = userData.data;
        if (keepLoggedIn) {
          setUserId(userInfo.id);
        }
        setUser(userInfo);
        router.replace("/(app)/(tabs)/(dashboard)");
      } else {
        reset();
        setStep("email");
        console.error(msg);
      }
    } catch (error) {
      setLoadingUser(false);
      console.error("Login error:", error);
      reset();
      setStep("email");
    }
  };

  const handleBack = () => {
    reset();
    setUserId(null);
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
          rules={{
            required: "Email obrigatório",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email inválido",
            },
          }}
          error={isSubmitted ? errors.email?.message : undefined}
        />
      </View>

      <TouchableOpacity className="flex-row items-center gap-2 mt-20" onPress={() => setKeepLoggedIn((prev) => !prev)}>
        <View className="w-5 h-5 rounded border border-gray-400 items-center justify-center">
          {keepLoggedIn && <Check size={16} color="#000" />}
        </View>
        <Text className="text-sm text-gray-700 dark:text-gray-300">{t("onboarding.remember")}</Text>
      </TouchableOpacity>

      <View className="flex-1 items-center gap-8 justify-center">
        <Button
          title={t("onboarding.email.button")}
          onPress={handleSubmit(handleEmailSubmit)}
          className="rounded-3xl"
          loading={isLoading}
          disabled={isLoading}
        />
        <Button
          variant="ghost"
          title={t("onboarding.register.button")}
          onPress={handleNavigetionRegister}
          className="rounded-3xl"
          loading={isLoading}
          disabled={isLoading}
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
        <Avatar size={75} imageUrl={user?.image || ""} name={user?.name || ""} />
        <View className="flex-1 bg-light-background-secondary dark:bg-dark-background-alternative">
          <Text className="text-md font-extrabold text-gray-800 dark:text-white">{greeting}</Text>
          <Text numberOfLines={1} className="text-2xl font-bold dark:text-white">
            {user?.name}
          </Text>
          <Text className="text-md text-gray-600 dark:text-gray-400">{user?.email}</Text>
          <Text className="text-md text-gray-600 dark:text-gray-400">{maskCpf(user?.document)}</Text>
        </View>
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

      <View className="flex-1 items-center gap-8 justify-center">
        <Button
          title={t("onboarding.success.button")}
          onPress={handleSubmit(handleLoginSubmit)}
          className="rounded-3xl"
          loading={isLoading}
          disabled={isLoading}
        />
        <Button
          title={t("onboarding.email.edit")}
          onPress={handleBack}
          className="rounded-3xl"
          loading={isLoading}
          disabled={isLoading}
          variant="ghost"
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

  const isLoading = loadinAuth || loadingUser;

  return (
    <View className="flex-1 bg-light-brand-primary dark:bg-dark-brand-primary">
      <View className="items-center justify-center mt-20 gap-2 py-2">
        <Text className="font-bold text-white text-4xl">{t("onboarding.header.title")}</Text>
        <Text className="font-medium text-white">{t("onboarding.header.version")}</Text>
      </View>

      {isLoading ? (
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
