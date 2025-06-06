import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/header";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";

export default function StackLayout() {
  const { t } = useChangeLanguage();

  return (
    <Stack>
      <Stack.Screen
        name="(launcher)/index"
        options={{
          title: t("stack.launcher.title"),
          header: (props) => <Header subTitle={t("stack.launcher.subtitle")} {...props} />,
        }}
      />
      <Stack.Screen
        name="(notification)/index"
        options={{
          title: t("stack.notification.title"),
          header: (props) => <Header subTitle={t("stack.notification.subtitle")} {...props} />,
        }}
      />
      <Stack.Screen
        name="(profile)/index"
        options={{
          title: t("stack.profile.title"),
          header: (props) => <Header subTitle={t("stack.profile.subtitle")} {...props} />,
        }}
      />
    </Stack>
  );
}
