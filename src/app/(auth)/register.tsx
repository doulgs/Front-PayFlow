import React from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Button } from "@/components/ui/buttons";
import { CustomInput } from "@/components/ui/inputs";
import { useAuth } from "@/contexts/auth-provaider";
import { useToast } from "@/contexts/toast-context";
import { UserRegisterDTO } from "@/dtos/user";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { useCustomNavigation } from "@/hooks/useCustomNavigation";
import { useTheme } from "@/hooks/useTheme";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function SignUp() {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors, isSubmitted, touchedFields },
  } = useForm<UserRegisterDTO>({
    defaultValues: {
      accepted_terms: false,
    },
    mode: "onSubmit",
  });
  const { t } = useChangeLanguage();
  const { router } = useCustomNavigation();
  const { palette } = useTheme();
  const { signUp, loading } = useAuth();
  const { showToast } = useToast();

  const onSubmit: SubmitHandler<UserRegisterDTO> = async (data) => {
    const cleanedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, typeof value === "string" ? value.trimEnd() : value])
    ) as UserRegisterDTO;

    const { isValid } = await signUp(cleanedData);
    if (isValid) {
      showToast({
        type: "success",
        text: "Cadastro realizado com sucesso!",
        description: "Acessse sua conta agora.",
        position: "bottom",
      });
      router.replace("/(auth)");
    } else {
      showToast({
        type: "warning",
        text: "Erro ao cadastrar",
        description: "Verifique os dados informados e tente novamente.",
        position: "bottom",
      });
    }
  };

  return (
    <View className="flex-1 bg-light-brand-primary dark:bg-dark-brand-primary">
      <View className="items-center justify-center mt-20 gap-2 py-2">
        <Text className="font-bold text-white text-4xl">{t("onboarding.header.title")}</Text>
        <Text className="font-medium text-white">{t("onboarding.header.version")}</Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center bg-light-background-primary dark:bg-dark-background-primary rounded-t-2xl p-8">
          <ActivityIndicator size="large" color={palette.brand.primary} />
        </View>
      ) : (
        <View className="flex-1 bg-light-background-secondary dark:bg-dark-background-alternative rounded-t-2xl p-8">
          <Text className="font-bold text-center dark:text-white text-4xl mb-4">{t("header.title")}</Text>
          <ScrollView className="">
            <CustomInput
              name="nickname"
              label={t("nickname.label")}
              control={control}
              type="text"
              variant="flat"
              placeholder={t("nickname.placeholder")}
              rules={{ required: "Apelido obrigatório" }}
              error={isSubmitted || touchedFields.nickname ? errors.nickname?.message : undefined}
            />
            <CustomInput
              name="name"
              label={t("name.label")}
              control={control}
              type="text"
              variant="flat"
              placeholder={t("name.placeholder")}
              rules={{ required: "Nome obrigatório" }}
              error={isSubmitted || touchedFields.name ? errors.name?.message : undefined}
            />
            <CustomInput
              name="document"
              label={t("cpf.label")}
              control={control}
              type="cpf"
              variant="flat"
              placeholder={t("cpf.placeholder")}
              rules={{
                required: "CPF obrigatório",
                pattern: {
                  value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                  message: "CPF inválido",
                },
              }}
              error={isSubmitted || touchedFields.document ? errors.document?.message : undefined}
            />

            <CustomInput
              name="email"
              label={t("email.label")}
              control={control}
              type="mail"
              variant="flat"
              placeholder={t("email.placeholder")}
              rules={{
                required: "Email obrigatório",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email inválido",
                },
              }}
              error={isSubmitted || touchedFields.email ? errors.email?.message : undefined}
            />

            <CustomInput
              name="password"
              label={t("password.label")}
              control={control}
              type="password"
              variant="flat"
              placeholder={t("password.placeholder")}
              rules={{
                required: "Senha obrigatória",
                minLength: {
                  value: 8,
                  message: "Senha deve ter pelo menos 8 caracteres",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                  message: "Senha deve incluir letra, número e caractere especial",
                },
              }}
              error={isSubmitted || touchedFields.password ? errors.password?.message : undefined}
            />

            <CustomInput
              name="phone"
              label={t("phone.label")}
              control={control}
              type="phone"
              variant="flat"
              placeholder={t("phone.placeholder")}
              rules={{
                required: "Telefone obrigatório",
                pattern: {
                  value: /^\(\d{2}\)\d{5}-\d{4}$/,
                  message: "Telefone inválido",
                },
              }}
              error={isSubmitted || touchedFields.phone ? errors.phone?.message : undefined}
            />

            <Controller
              control={control}
              name="accepted_terms"
              render={({ field: { onChange, value } }) => (
                <View className="flex-row items-center gap-2 mt-5">
                  <TouchableOpacity
                    onPress={() => onChange(!value)}
                    className="w-5 h-5 border border-gray-400 rounded justify-center items-center bg-white dark:bg-gray-800"
                  >
                    {value && <View className="w-3 h-3 bg-light-brand-primary dark:bg-dark-brand-primary rounded" />}
                  </TouchableOpacity>
                  <Text className="text-sm dark:text-white">
                    {t("terms.accept")} <Text className="underline">{t("terms.link")}</Text>
                  </Text>
                </View>
              )}
            />

            <View className="flex-1 items-center justify-center mt-5">
              <Button
                title={loading ? "" : t("button")}
                onPress={handleSubmit(onSubmit)}
                className="rounded-3xl flex-row justify-center items-center"
                disabled={!watch("accepted_terms") || loading}
              >
                {loading && <ActivityIndicator color="#fff" />}
              </Button>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
