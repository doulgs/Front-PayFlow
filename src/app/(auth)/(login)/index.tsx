import { useForm } from "react-hook-form";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Button } from "@/components/buttons";
import { CustomInput } from "@/components/inputs";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { useCustomNavigation } from "@/hooks/useCustomNavigation";

export default function Login() {
  const { to } = useCustomNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async () => {
    to.auth.confirmPhone();
  };

  const { t, currentLanguage, changeLanguage } = useChangeLanguage();

  const toggleLanguage = () => {
    changeLanguage(currentLanguage === "pt" ? "en" : "pt");
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-light-background-primary dark:bg-dark-background-primary">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="min-h-screen justify-center items-center px-4 py-8">
              <View className="w-full bg-light-background-secondary dark:bg-dark-background-secondary p-6 border border-slate-400 rounded-3xl shadow-md">
                <View className="flex-row items-center gap-2 justify-center">
                  <Image
                    source={require("../../../assets/gptmaker.png")}
                    resizeMode="contain"
                    style={{ width: 48, height: 48 }}
                  />
                  <Text className="text-light-brand-primary dark:text-white text-4xl font-bold">GPT Maker</Text>
                </View>

                <Text className="text-light-brand-secondary dark:text-dark-brand-secondary text-center font-medium my-4">
                  {t("login.description")}
                </Text>

                <CustomInput
                  name="email"
                  label={t("login.input.email.label")}
                  control={control}
                  type="mail"
                  placeholder={t("login.input.email.placeholder")}
                  error={errors.email?.message}
                />

                <CustomInput
                  name="password"
                  label={t("login.input.password.label")}
                  control={control}
                  type="password"
                  placeholder={t("login.input.password.placeholder")}
                  error={errors.password?.message}
                />

                <View className="flex-row justify-end mt-2 mb-4">
                  <TouchableOpacity>
                    <Text className="text-light-brand-primary dark:text-dark-brand-primary font-semibold text-sm">
                      {t("login.forgotPassword")}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Button title={t("login.button.submit")} onPress={handleSubmit(onSubmit)} />

                <TouchableOpacity onPress={() => to.auth.register()}>
                  <View className="flex-row justify-center mt-4">
                    <Text className="text-gray-600 dark:text-gray-300 text-sm">
                      {t("login.button.registerRedirect.label") + " "}
                    </Text>
                    <Text className="text-light-brand-primary dark:text-dark-brand-primary font-semibold text-sm">
                      {t("login.button.registerRedirect.link")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
