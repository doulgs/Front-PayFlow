import { Header } from "@/components/header";
import { CustomTabBar } from "@/components/tab";
import { useAuth } from "@/contexts/auth-provaider";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";
import { Tabs } from "expo-router";
import { LogOut } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  const { user, signOut } = useAuth();
  const { t } = useChangeLanguage();

  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="(dashboard)/index"
        options={{
          title: t("tabs.dashboard"),
          header: (props) => (
            <Header
              subTitle={user?.user_metadata.name}
              imageAvatar={user?.user_metadata.image}
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
