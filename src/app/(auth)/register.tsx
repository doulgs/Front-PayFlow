import React from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Button } from "@/components/ui/buttons";
import { CustomInput } from "@/components/ui/inputs";
import { useAuth } from "@/contexts/auth-provaider";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { useCustomNavigation } from "@/hooks/useCustomNavigation";
import { useTheme } from "@/hooks/useTheme";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RegisterDTO } from "@/dtos/user/user-register-dto";

export default function SignUp() {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDTO>({
    defaultValues: {
      accepted_terms: false,
    },
  });
  const { t } = useChangeLanguage();
  const { router } = useCustomNavigation();
  const { palette } = useTheme();
  const { signUp, loading } = useAuth();

  const onSubmit: SubmitHandler<RegisterDTO> = async (data) => {
    const cleanedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, typeof value === "string" ? value.trimEnd() : value])
    ) as RegisterDTO;

    const result = await signUp(cleanedData);
    if (!result?.error) {
      router.replace("/(app)/(tabs)/(dashboard)");
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
              error={errors.nickname?.message}
            />
            <CustomInput
              name="name"
              label={t("name.label")}
              control={control}
              type="text"
              variant="flat"
              placeholder={t("name.placeholder")}
              error={errors.name?.message}
            />
            <CustomInput
              name="document"
              label={t("cpf.label")}
              control={control}
              type="cpf"
              variant="flat"
              placeholder={t("cpf.placeholder")}
              error={errors.document?.message}
            />

            <CustomInput
              name="email"
              label={t("email.label")}
              control={control}
              type="mail"
              variant="flat"
              placeholder={t("email.placeholder")}
              error={errors.email?.message}
            />

            <CustomInput
              name="password"
              label={t("password.label")}
              control={control}
              type="password"
              variant="flat"
              placeholder={t("password.placeholder")}
              error={errors.password?.message}
            />

            <CustomInput
              name="phone"
              label={t("phone.label")}
              control={control}
              type="number"
              variant="flat"
              placeholder={t("phone.placeholder")}
              error={errors.phone?.message}
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
                title={t("button")}
                onPress={handleSubmit(onSubmit)}
                className="rounded-3xl"
                disabled={!watch("accepted_terms")}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
