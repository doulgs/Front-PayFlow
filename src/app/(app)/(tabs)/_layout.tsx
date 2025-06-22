import { Header } from "@/components/header";
import { CustomTabBar } from "@/components/tab";
import { useAuth } from "@/contexts/auth-provaider";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { useUserStore } from "@/storages/useUserStore";
import { Tabs } from "expo-router";
import { LogOut } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  const { signOut } = useAuth();
  const { user } = useUserStore();
  const { t } = useChangeLanguage();

  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="(dashboard)/index"
        options={{
          title: t("tabs.dashboard"),
          header: (props) => (
            <Header
              subTitle={user?.name || ""}
              imageAvatar={user?.image || ""}
              hideBackButton
              showImageAvatar
              actions={[
                {
                  action: () => signOut(),
                  icon: <LogOut size={24} color="white" />,
                },
              ]}
              {...props}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(new)/index"
        options={{
          title: t("tabs.new"),
          header: (props) => <Header hideBackButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="(overview)/index"
        options={{
          title: t("tabs.overview"),
          header: (props) => <Header hideBackButton {...props} />,
        }}
      />
    </Tabs>
  );
}
